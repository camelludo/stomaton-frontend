"""
LangGraph Workflow Models for STOMATON
Agent execution tracking and workflow management
"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class AgentType(str, Enum):
    DATA_EXTRACTION = "data_extraction"
    VISION_ANALYSIS = "vision_analysis"
    MARKET_ANALYST = "market_analyst"
    CONTENT_ORCHESTRATOR = "content_orchestrator"
    WRITING_AGENT = "writing_agent"
    REVIEW_AGENT = "review_agent"

class ExecutionStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"
    CACHED = "cached"

class WorkflowStatus(str, Enum):
    INITIALIZED = "initialized"
    RUNNING = "running"
    PAUSED = "paused"  # Human-in-the-loop
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class AgentExecution(BaseModel):
    """Individual agent execution tracking"""
    execution_id: str
    workflow_id: str
    agent_type: AgentType
    agent_name: str
    
    # Execution details
    status: ExecutionStatus = ExecutionStatus.PENDING
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[float] = None
    
    # Data flow
    input_data: Dict[str, Any] = {}
    output_data: Optional[Dict[str, Any]] = None
    cache_key: Optional[str] = None
    
    # Error handling
    error_message: Optional[str] = None
    error_details: Optional[Dict] = None
    retry_count: int = 0
    max_retries: int = 3
    
    # Metadata
    model_used: Optional[str] = None
    tokens_used: Optional[int] = None
    api_cost: Optional[float] = None

class WorkflowExecution(BaseModel):
    """Complete workflow execution tracking"""
    workflow_id: str
    user_id: str
    stone_id: Optional[str] = None
    execution_id: Optional[str] = None  # Database execution ID
    
    # Workflow configuration
    workflow_type: str = "tilescribe_2_0"
    workflow_config: Dict[str, Any] = {}
    
    # Status tracking
    status: WorkflowStatus = WorkflowStatus.INITIALIZED
    started_at: datetime
    completed_at: Optional[datetime] = None
    paused_at: Optional[datetime] = None  # For human-in-the-loop
    total_duration_seconds: Optional[float] = None
    
    # Agent executions
    agent_executions: List[AgentExecution] = []
    
    # Input/Output
    initial_input: Dict[str, Any]
    final_output: Optional[Dict[str, Any]] = None
    
    # Human review
    requires_human_review: bool = True
    human_feedback: Optional[Dict] = None
    human_reviewed_at: Optional[datetime] = None
    human_reviewer_id: Optional[str] = None
    
    # Quality metrics
    quality_scores: Dict[str, float] = {}
    validation_results: Dict[str, bool] = {}

class CacheEntry(BaseModel):
    """Cache entry for expensive operations"""
    cache_key: str
    cache_type: str  # "seo_keywords", "vision_analysis", etc.
    cached_data: Dict[str, Any]
    expires_at: datetime
    created_at: datetime
    access_count: int = 0
    last_accessed: Optional[datetime] = None

class ProgressUpdate(BaseModel):
    """Real-time progress update for UI"""
    workflow_id: str
    current_agent: str
    progress_percentage: float
    status_message: str
    estimated_completion: Optional[datetime] = None
    current_step: str
    total_steps: int

# Request Models for LangGraph

class WorkflowStartRequest(BaseModel):
    """Start a new LangGraph workflow"""
    stone_name: str
    image_base64: Optional[str] = None
    technical_pdf_id: Optional[str] = None
    user_notes: Optional[str] = None
    workflow_config: Dict[str, Any] = {}

class WorkflowResumeRequest(BaseModel):
    """Resume a paused workflow (after human review)"""
    workflow_id: str
    human_feedback: Dict[str, Any]
    approved_changes: Dict[str, Any] = {}

class WorkflowCancelRequest(BaseModel):
    """Cancel a running workflow"""
    workflow_id: str
    reason: Optional[str] = None

# Response Models

class WorkflowStatusResponse(BaseModel):
    """Workflow status response"""
    workflow_id: str
    status: WorkflowStatus
    progress_percentage: float
    current_agent: Optional[str] = None
    estimated_completion: Optional[datetime] = None
    agent_executions: List[AgentExecution]

class AgentExecutionResponse(BaseModel):
    """Agent execution response"""
    execution_id: str
    status: ExecutionStatus
    output_data: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    duration_seconds: Optional[float] = None