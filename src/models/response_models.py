"""
Standardized Response Models for STOMATON API
Ensures consistent response format across all endpoints
"""

from pydantic import BaseModel
from typing import Optional, Any, Dict, List
from datetime import datetime

class StandardResponse(BaseModel):
    """Base response model for all API endpoints"""
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None
    metadata: Optional[Dict] = None

class AuthResponse(StandardResponse):
    """Authentication response with token and user data"""
    pass

class ContentGenerationResponse(StandardResponse):
    """Content generation response with generated content"""
    pass

class FieldGenerationResponse(StandardResponse):
    """Individual field generation response"""
    pass

class StoneSearchResponse(StandardResponse):
    """Stone knowledge search response"""
    pass

class AdminResponse(StandardResponse):
    """Admin operations response"""
    pass

class ErrorResponse(StandardResponse):
    """Error response with detailed error information"""
    success: bool = False
    error_code: Optional[str] = None
    error_details: Optional[Dict] = None

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    database: str
    version: str
    timestamp: datetime
    services: Dict[str, Any] = {}  # Allow complex nested objects

class SuccessResponse(StandardResponse):
    """Simple success response"""
    success: bool = True
    message: str