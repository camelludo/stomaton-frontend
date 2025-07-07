"""
Stone and Content Models for STOMATON
Prepared for LangGraph integration and document processing
"""

from pydantic import BaseModel
from typing import Optional, Dict, List, Any
from datetime import datetime
from enum import Enum

class StoneType(str, Enum):
    MARBLE = "Marble"
    TRAVERTINE = "Travertine"
    GRANITE = "Granite"
    QUARTZITE = "Quartzite"
    LIMESTONE = "Limestone"
    SANDSTONE = "Sandstone"
    SLATE = "Slate"
    ONYX = "Onyx"
    BASALT = "Basalt"

class DocumentType(str, Enum):
    TECHNICAL_PDF = "technical_pdf"
    IMAGE = "image"
    CERTIFICATE = "certificate"
    SPECIFICATION = "specification"

class ProcessingStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class StoneBasicInfo(BaseModel):
    """Basic stone information"""
    name: str
    type: StoneType
    origin: str
    classification: str
    geological_formation: Optional[str] = None
    primary_color: str
    secondary_colors: List[str] = []
    pattern_type: str
    rarity: str
    market_position: str

class TechnicalSpecifications(BaseModel):
    """Technical specifications with UNE-EN standards"""
    flexural_strength: Optional[str] = None
    compressive_strength: Optional[str] = None
    water_absorption: Optional[str] = None
    open_porosity: Optional[str] = None
    apparent_density: Optional[str] = None
    abrasion_resistance: Optional[str] = None
    mohs_hardness: Optional[str] = None
    frost_resistance: Optional[str] = None
    fire_classification: Optional[str] = None

class SurfaceFinish(BaseModel):
    """Surface finish information"""
    name: str
    description: str
    maintenance: str
    applications: List[str]
    slip_rating: str

class CommercialInfo(BaseModel):
    """Commercial information"""
    price_range: Dict[str, Any]
    availability: str
    lead_time: str
    minimum_order: Optional[str] = None
    block_sizes: List[str] = []
    standard_thicknesses: List[str] = []
    market_demand: str

class Application(BaseModel):
    """Stone application information"""
    application: str
    suitability: str
    considerations: str

class MaintenanceInfo(BaseModel):
    """Maintenance information"""
    sealing_frequency: str
    recommended_sealers: List[str]
    cleaning_products: List[str]
    stain_resistance: str
    repair_procedures: str
    long_term_care: str

class ProfessionalContent(BaseModel):
    """Professional descriptions for different audiences"""
    architect_description: str
    designer_description: str
    technical_specification: str
    installation_notes: str

class Stone(BaseModel):
    """Complete stone model"""
    stone_id: str
    basic_info: StoneBasicInfo
    technical_specifications: TechnicalSpecifications
    surface_finishes: Dict[str, List[SurfaceFinish]]
    commercial_information: CommercialInfo
    applications: Dict[str, List[Application]]
    maintenance: MaintenanceInfo
    professional_content: ProfessionalContent
    geological_details: Optional[Dict] = None
    design_characteristics: Optional[Dict] = None
    
    created_at: datetime
    updated_at: datetime
    vector_id: Optional[str] = None

class StoneDocument(BaseModel):
    """Document associated with a stone (PDF, images, etc.)"""
    id: str
    stone_id: str
    document_type: DocumentType
    file_name: str
    file_path: str
    file_size: int
    mime_type: str
    
    # Extracted data from document processing
    extracted_data: Dict[str, Any] = {}
    processing_status: ProcessingStatus = ProcessingStatus.PENDING
    processing_metadata: Dict[str, Any] = {}
    
    created_at: datetime
    processed_at: Optional[datetime] = None

class GeneratedContent(BaseModel):
    """Generated content for all CMS fields"""
    stone_name: str
    description: str
    additional_description: str
    seo: Dict[str, str]  # title, meta_description, keywords, image_alt_text
    
    # Generation metadata
    generation_method: str  # "traditional", "enhanced", "langgraph"
    model_used: str
    generation_time: float
    created_at: datetime

class ContentHistory(BaseModel):
    """Content generation history"""
    id: str
    user_id: str
    stone_id: Optional[str] = None
    generated_content: GeneratedContent
    user_feedback: Optional[Dict] = None
    is_published: bool = False
    created_at: datetime

# Request Models
class StoneSearchRequest(BaseModel):
    """Stone knowledge search request"""
    query: str
    top_k: int = 5
    similarity_threshold: float = 0.7
    stone_types: Optional[List[StoneType]] = None

class FieldGenerationRequest(BaseModel):
    """Individual field generation request"""
    field_type: str
    stone_context: str
    user_input: Optional[str] = ""
    existing_fields: Optional[Dict] = {}
    selected_stone: Optional[str] = None
    document_data: Optional[Dict] = None  # From PDF processing

class ContentGenerationRequest(BaseModel):
    """Content generation request"""
    base64_image: Optional[str] = None
    seo_keywords: Optional[str] = None
    additional_notes: Optional[str] = None
    content_style: str = "MT Stone Page"
    language: str = "en"
    ai_provider: str = "openai"
    ai_model: str = "gpt-4o-mini"
    use_enhanced_ai: bool = False
    selected_stone: Optional[str] = None
    document_id: Optional[str] = None  # Reference to uploaded PDF