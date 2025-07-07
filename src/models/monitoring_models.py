"""
AI Monitoring and Analytics Models for STOMATON
Comprehensive monitoring for AI usage, performance, costs, and system health
"""

from pydantic import BaseModel
from typing import Optional, Dict, List, Any
from datetime import datetime
from enum import Enum

class AIProvider(str, Enum):
    OPENAI = "openai"
    GEMINI = "gemini"
    ANTHROPIC = "anthropic"

class AIModel(str, Enum):
    # OpenAI Models
    GPT_4O = "gpt-4o"
    GPT_4O_MINI = "gpt-4o-mini"
    GPT_4_TURBO = "gpt-4-turbo"
    
    # Gemini Models
    GEMINI_PRO = "gemini-pro"
    GEMINI_1_5_PRO = "gemini-1.5-pro"
    
    # Anthropic Models
    CLAUDE_3_5_SONNET = "claude-3-5-sonnet-20241022"
    CLAUDE_3_HAIKU = "claude-3-haiku-20240307"

class RequestStatus(str, Enum):
    SUCCESS = "success"
    FAILURE = "failure"
    TIMEOUT = "timeout"
    RATE_LIMITED = "rate_limited"

class ContentType(str, Enum):
    MT_STONE_PAGE = "MT Stone Page"
    SOCIAL_MEDIA = "Social Media"
    ARCHITECTURAL_SPEC = "Architectural Spec"

class ServiceType(str, Enum):
    CONTENT_GENERATION = "content_generation"
    CONTENT_COMPARISON = "content_comparison"
    FIELD_GENERATION = "field_generation"
    RAG_SEARCH = "rag_search"
    IMAGE_ANALYSIS = "image_analysis"

class SystemComponent(str, Enum):
    DATABASE = "database"
    VECTOR_DB = "vector_db"
    AI_SERVICES = "ai_services"
    AUTHENTICATION = "authentication"
    STORAGE = "storage"

class AIUsageLog(BaseModel):
    """Log entry for AI API usage"""
    id: str
    timestamp: datetime
    user_id: str
    session_id: Optional[str] = None
    
    # AI Provider Details
    ai_provider: AIProvider
    ai_model: AIModel
    service_type: ServiceType
    content_type: Optional[ContentType] = None
    
    # Request Details
    request_status: RequestStatus
    request_size: int  # Input tokens/characters
    response_size: int  # Output tokens/characters
    has_image: bool = False
    use_enhanced_ai: bool = False
    
    # Performance Metrics
    response_time_ms: int
    processing_time_ms: Optional[int] = None
    queue_time_ms: Optional[int] = None
    
    # Cost Tracking
    input_tokens: Optional[int] = None
    output_tokens: Optional[int] = None
    estimated_cost_usd: Optional[float] = None
    
    # Error Information
    error_message: Optional[str] = None
    error_code: Optional[str] = None
    retry_count: int = 0
    
    # Metadata
    user_tier: str
    user_role: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class SystemHealthLog(BaseModel):
    """System health monitoring log"""
    id: str
    timestamp: datetime
    
    # Component Status
    component: SystemComponent
    status: str  # "healthy", "degraded", "down"
    response_time_ms: Optional[int] = None
    
    # Specific Metrics
    cpu_usage_percent: Optional[float] = None
    memory_usage_percent: Optional[float] = None
    disk_usage_percent: Optional[float] = None
    
    # Database Metrics
    db_connections_active: Optional[int] = None
    db_connections_max: Optional[int] = None
    db_query_avg_time_ms: Optional[float] = None
    
    # Vector DB Metrics
    vector_db_total_vectors: Optional[int] = None
    vector_db_index_size: Optional[float] = None
    vector_db_query_time_ms: Optional[float] = None
    
    # Error Information
    error_message: Optional[str] = None
    
    # Additional Metadata
    metadata: Optional[Dict[str, Any]] = None

class PerformanceMetric(BaseModel):
    """Performance metrics aggregation"""
    id: str
    timestamp: datetime
    metric_type: str  # "response_time", "throughput", "error_rate", "cost"
    timeframe: str  # "1min", "5min", "1hour", "1day"
    
    # AI Performance
    ai_provider: Optional[AIProvider] = None
    ai_model: Optional[AIModel] = None
    service_type: Optional[ServiceType] = None
    
    # Aggregated Values
    count: int
    avg_value: float
    min_value: float
    max_value: float
    p50_value: Optional[float] = None
    p95_value: Optional[float] = None
    p99_value: Optional[float] = None
    
    # Additional Metrics
    success_rate: Optional[float] = None
    error_rate: Optional[float] = None
    total_cost_usd: Optional[float] = None

class UserActivityLog(BaseModel):
    """User activity and usage tracking"""
    id: str
    timestamp: datetime
    user_id: str
    session_id: Optional[str] = None
    
    # Activity Details
    action: str  # "login", "content_generation", "search", "logout"
    endpoint: Optional[str] = None
    http_method: Optional[str] = None
    
    # Request Details
    request_size: Optional[int] = None
    response_size: Optional[int] = None
    response_time_ms: Optional[int] = None
    status_code: Optional[int] = None
    
    # User Context
    user_tier: str
    user_role: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    
    # Usage Metrics
    monthly_usage_before: int
    monthly_usage_after: int
    
    # Error Information
    error_message: Optional[str] = None

class CostMetric(BaseModel):
    """Cost tracking and budgeting"""
    id: str
    timestamp: datetime
    period: str  # "daily", "weekly", "monthly"
    
    # Cost Breakdown
    ai_provider: AIProvider
    total_cost_usd: float
    input_tokens_cost: Optional[float] = None
    output_tokens_cost: Optional[float] = None
    image_processing_cost: Optional[float] = None
    
    # Usage Metrics
    total_requests: int
    total_input_tokens: Optional[int] = None
    total_output_tokens: Optional[int] = None
    total_images_processed: Optional[int] = None
    
    # User Breakdown
    user_breakdown: Optional[Dict[str, float]] = None
    tier_breakdown: Optional[Dict[str, float]] = None

class AlertRule(BaseModel):
    """Alert configuration for monitoring"""
    id: str
    name: str
    description: str
    is_active: bool = True
    
    # Alert Conditions
    metric_type: str  # "response_time", "error_rate", "cost", "usage"
    threshold_value: float
    comparison: str  # "greater_than", "less_than", "equals"
    timeframe_minutes: int
    
    # Alert Actions
    notification_channels: List[str]  # "email", "slack", "webhook"
    notification_recipients: List[str]
    
    # Alert State
    is_triggered: bool = False
    last_triggered: Optional[datetime] = None
    trigger_count: int = 0
    
    created_at: datetime
    updated_at: datetime

class MonitoringDashboardData(BaseModel):
    """Real-time dashboard data model"""
    timestamp: datetime
    
    # Current Status
    system_status: str  # "healthy", "degraded", "critical"
    active_users: int
    total_requests_today: int
    
    # AI Usage Summary
    ai_requests_last_hour: int
    avg_response_time_ms: float
    success_rate_percent: float
    total_cost_today_usd: float
    
    # Provider Breakdown
    provider_usage: Dict[str, int]
    provider_costs: Dict[str, float]
    provider_performance: Dict[str, float]
    
    # Service Performance
    service_performance: Dict[str, Dict[str, float]]
    
    # System Health
    component_status: Dict[str, str]
    component_response_times: Dict[str, float]
    
    # Recent Activity
    recent_errors: List[Dict[str, Any]]
    recent_alerts: List[Dict[str, Any]]
    top_users: List[Dict[str, Any]]

# Request Models
class MonitoringQuery(BaseModel):
    """Query parameters for monitoring data"""
    start_time: datetime
    end_time: datetime
    metric_types: Optional[List[str]] = None
    ai_providers: Optional[List[AIProvider]] = None
    ai_models: Optional[List[AIModel]] = None
    service_types: Optional[List[ServiceType]] = None
    user_ids: Optional[List[str]] = None
    aggregation: str = "5min"  # "1min", "5min", "1hour", "1day"

class AlertCreateRequest(BaseModel):
    """Request to create new alert rule"""
    name: str
    description: str
    metric_type: str
    threshold_value: float
    comparison: str
    timeframe_minutes: int
    notification_channels: List[str]
    notification_recipients: List[str]

# Response Models
class MonitoringStatsResponse(BaseModel):
    """Response for monitoring statistics"""
    success: bool
    data: Dict[str, Any]
    metadata: Optional[Dict[str, Any]] = None
    
class AlertResponse(BaseModel):
    """Response for alert operations"""
    success: bool
    alert_id: Optional[str] = None
    message: Optional[str] = None
    error: Optional[str] = None

class DashboardResponse(BaseModel):
    """Real-time dashboard response"""
    success: bool
    dashboard_data: MonitoringDashboardData
    refresh_rate_seconds: int = 30
