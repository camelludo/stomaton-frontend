"""
User and Authentication Models for STOMATON
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"

class UserTier(str, Enum):
    BASIC = "basic"
    PREMIUM = "premium"

class User(BaseModel):
    """User model for database operations"""
    id: str
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.USER
    tier: UserTier = UserTier.BASIC
    is_active: bool = True
    created_at: datetime
    last_login: Optional[datetime] = None
    
    # Usage tracking
    usage_limits: Dict = {"monthly_generations": 50}
    usage_current: Dict = {"generations_used": 0, "last_reset": None}

class UserCreate(BaseModel):
    """Model for creating new users"""
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.USER
    tier: UserTier = UserTier.BASIC

class UserUpdate(BaseModel):
    """Model for updating user information"""
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    tier: Optional[UserTier] = None
    is_active: Optional[bool] = None

class LoginRequest(BaseModel):
    """Login request model"""
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    """Login response model"""
    access_token: str
    token_type: str = "bearer"
    user: User

class UserStats(BaseModel):
    """User statistics model"""
    total_users: int
    active_users: int
    premium_users: int
    total_generations_this_month: int
    users_details: List[User]