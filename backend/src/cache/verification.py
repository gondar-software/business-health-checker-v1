from cachetools import TTLCache
from datetime import datetime, timedelta
import random
from typing import Dict, List, Tuple

class VerificationCache:
    def __init__(self):
        self.code_cache = TTLCache(maxsize=1000, ttl=900)
        
        self.rate_limit_cache: Dict[str, Dict[str, List[datetime]]] = {}
        self.rate_limit_window = timedelta(hours=2)
        self.max_generate_attempts = 3
        self.max_verify_attempts = 3

    def generate_and_store_code(self, user_email: str) -> Tuple[bool, int]:
        """Store verification code and check rate limiting for generation"""
        code = random.randint(100000, 999999)
        now = datetime.now()
        
        if self._is_rate_limited(user_email, "generate", now):
            return False, code
        
        self.code_cache[user_email] = code
        self._record_attempt(user_email, "generate", now)
        
        if user_email in self.rate_limit_cache and "verify" in self.rate_limit_cache[user_email]:
            self.rate_limit_cache[user_email]["verify"] = []
            
        return True, code

    def verify_code(self, user_email: str, code: int) -> Tuple[bool, bool]:
        """Check if the provided code matches what's in cache
        Returns tuple of (is_success, is_rate_limited)"""
        now = datetime.now()
        
        if self._is_rate_limited(user_email, "verify", now):
            return False, True
        
        cached_code = self.code_cache.get(user_email)
        is_valid = cached_code == code
        
        self._record_attempt(user_email, "verify", now)
        
        if is_valid:
            self.code_cache.pop(user_email, None)
            self._clear_rate_limits(user_email)
            self.clear_expired_entries()
        
        return is_valid, False

    def _record_attempt(self, user_email: str, attempt_type: str, timestamp: datetime):
        """Record an attempt in the rate limit cache"""
        if user_email not in self.rate_limit_cache:
            self.rate_limit_cache[user_email] = {
                "generate": [],
                "verify": []
            }
        self.rate_limit_cache[user_email][attempt_type].append(timestamp)

    def _is_rate_limited(self, user_email: str, attempt_type: str, current_time: datetime) -> bool:
        """Check if user has exceeded rate limit for the specific operation type"""
        if user_email not in self.rate_limit_cache:
            return False
        
        if attempt_type not in self.rate_limit_cache[user_email]:
            return False
        
        max_attempts = (
            self.max_generate_attempts if attempt_type == "generate"
            else self.max_verify_attempts
        )
        
        valid_attempts = [
            ts for ts in self.rate_limit_cache[user_email][attempt_type]
            if current_time - ts <= self.rate_limit_window
        ]
        
        self.rate_limit_cache[user_email][attempt_type] = valid_attempts
        
        return len(valid_attempts) >= max_attempts

    def _clear_rate_limits(self, user_email: str):
        """Clear rate limits for a user (typically after successful verification)"""
        if user_email in self.rate_limit_cache:
            del self.rate_limit_cache[user_email]

    def clear_expired_entries(self):
        """Clean up old rate limit entries"""
        now = datetime.now()
        for user_email in list(self.rate_limit_cache.keys()):
            self._is_rate_limited(user_email, "generate", now)
            self._is_rate_limited(user_email, "verify", now)
            if not any(self.rate_limit_cache[user_email].values()):
                del self.rate_limit_cache[user_email]

verification_cache = VerificationCache()