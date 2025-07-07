"""
STOMATON Wiki Models
Data models for Wiki.js integration and page management.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field, validator


class WikiPageStatus(str, Enum):
    """Wiki page publication status"""
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"
    UNDER_REVIEW = "under_review"


class WikiPageType(str, Enum):
    """Types of wiki pages in STOMATON"""
    STONE_PROFILE = "stone_profile"
    APPLICATION_GUIDE = "application_guide"
    TECHNICAL_RESOURCE = "technical_resource"
    VISUAL_ATLAS = "visual_atlas"
    FAQ = "faq"
    GLOSSARY = "glossary"


class WikiAuthor(BaseModel):
    """Author information for wiki pages"""
    id: str
    name: str
    email: Optional[str] = None
    role: str = "contributor"


class WikiPageMetadata(BaseModel):
    """Metadata for wiki pages"""
    seo_title: Optional[str] = Field(None, max_length=60)
    seo_description: Optional[str] = Field(None, max_length=160)
    keywords: List[str] = Field(default_factory=list)
    canonical_url: Optional[str] = None
    og_image: Optional[str] = None
    schema_markup: Optional[Dict[str, Any]] = None
    
    @validator('keywords')
    def limit_keywords(cls, v):
        """Limit keywords to 10 for SEO best practices"""
        return v[:10] if v else []


class WikiPageSection(BaseModel):
    """Individual section within a wiki page"""
    id: str
    title: str
    content: str
    order: int
    type: str = "markdown"  # markdown, html, or component
    metadata: Optional[Dict[str, Any]] = None


class WikiPageCreate(BaseModel):
    """Model for creating a new wiki page"""
    title: str = Field(..., min_length=1, max_length=255)
    path: str = Field(..., pattern=r'^[a-z0-9\-/]+$')
    content: str
    description: Optional[str] = Field(None, max_length=500)
    tags: List[str] = Field(default_factory=list)
    page_type: WikiPageType
    status: WikiPageStatus = WikiPageStatus.DRAFT
    locale: str = "en"
    is_private: bool = False
    metadata: Optional[WikiPageMetadata] = None
    
    @validator('path')
    def validate_path(cls, v):
        """Ensure path is URL-friendly"""
        if not v.startswith('/'):
            v = '/' + v
        return v.lower().strip('/')
    
    @validator('tags')
    def clean_tags(cls, v):
        """Clean and validate tags"""
        return [tag.lower().strip() for tag in v if tag.strip()]


class WikiPageUpdate(BaseModel):
    """Model for updating an existing wiki page"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = None
    description: Optional[str] = Field(None, max_length=500)
    tags: Optional[List[str]] = None
    status: Optional[WikiPageStatus] = None
    metadata: Optional[WikiPageMetadata] = None
    
    @validator('tags')
    def clean_tags(cls, v):
        """Clean and validate tags if provided"""
        if v is not None:
            return [tag.lower().strip() for tag in v if tag.strip()]
        return v


class WikiPage(BaseModel):
    """Complete wiki page model"""
    id: int
    title: str
    path: str
    content: str
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    page_type: WikiPageType
    status: WikiPageStatus
    locale: str = "en"
    is_private: bool = False
    author: Optional[WikiAuthor] = None
    metadata: Optional[WikiPageMetadata] = None
    version: int = 1
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
    
    @property
    def url(self) -> str:
        """Generate full URL for the page"""
        from config.stomaton_config import stomaton_config
        return f"{stomaton_config.WIKI_URL}/{self.path}"
    
    @property
    def is_published(self) -> bool:
        """Check if page is published"""
        return self.status == WikiPageStatus.PUBLISHED
    
    def to_search_doc(self) -> Dict[str, Any]:
        """Convert to search index document"""
        return {
            "id": self.id,
            "title": self.title,
            "path": self.path,
            "description": self.description,
            "content": self.content[:1000],  # First 1000 chars for search
            "tags": self.tags,
            "page_type": self.page_type,
            "locale": self.locale,
            "updated_at": self.updated_at.isoformat()
        }


class WikiSearchQuery(BaseModel):
    """Search query for wiki pages"""
    query: str = Field(..., min_length=1)
    page_type: Optional[WikiPageType] = None
    tags: Optional[List[str]] = None
    locale: str = "en"
    limit: int = Field(10, ge=1, le=100)
    offset: int = Field(0, ge=0)
    include_drafts: bool = False


class WikiSearchResult(BaseModel):
    """Search result for wiki pages"""
    id: int
    title: str
    path: str
    description: Optional[str] = None
    score: float
    highlights: Optional[Dict[str, List[str]]] = None
    page_type: WikiPageType
    tags: List[str] = Field(default_factory=list)
    url: str


class WikiSearchResponse(BaseModel):
    """Response for wiki search requests"""
    results: List[WikiSearchResult]
    total: int
    query: str
    limit: int
    offset: int
    took_ms: Optional[int] = None


class StoneProfileTemplate(BaseModel):
    """Template for stone profile wiki pages"""
    stone_name: str
    stone_type: str
    origin: List[str]
    colors: List[str]
    
    # Overview section
    description: str
    geological_formation: Optional[str] = None
    historical_significance: Optional[str] = None
    
    # Technical specifications
    hardness_mohs: Optional[float] = None
    density: Optional[str] = None
    absorption_rate: Optional[str] = None
    compressive_strength: Optional[str] = None
    flexural_strength: Optional[str] = None
    
    # Visual characteristics
    patterns: List[str] = Field(default_factory=list)
    finish_options: List[str] = Field(default_factory=list)
    edge_treatments: List[str] = Field(default_factory=list)
    
    # Applications
    recommended_uses: List[str] = Field(default_factory=list)
    unsuitable_uses: List[str] = Field(default_factory=list)
    installation_notes: Optional[str] = None
    
    # Maintenance
    sealing_required: bool = True
    sealing_frequency: Optional[str] = None
    cleaning_instructions: Optional[str] = None
    stain_resistance: Optional[str] = None
    
    # Market information
    price_range: Optional[str] = None
    availability: Optional[str] = None
    popular_sizes: List[str] = Field(default_factory=list)
    
    # Related content
    similar_stones: List[str] = Field(default_factory=list)
    alternative_stones: List[str] = Field(default_factory=list)
    complementary_stones: List[str] = Field(default_factory=list)
    
    # Go2Stone integration
    go2stone_product_ids: List[str] = Field(default_factory=list)
    supplier_notes: Optional[str] = None
    
    def to_wiki_content(self) -> str:
        """Convert template to wiki markdown content"""
        sections = []
        
        # Title and overview
        sections.append(f"# {self.stone_name}")
        sections.append(f"\n## Overview")
        sections.append(self.description)
        
        if self.geological_formation:
            sections.append(f"\n### Geological Formation")
            sections.append(self.geological_formation)
        
        # Technical specifications
        sections.append(f"\n## Technical Specifications")
        sections.append(f"- **Type**: {self.stone_type}")
        sections.append(f"- **Origin**: {', '.join(self.origin)}")
        sections.append(f"- **Colors**: {', '.join(self.colors)}")
        
        if self.hardness_mohs:
            sections.append(f"- **Hardness (Mohs)**: {self.hardness_mohs}")
        if self.density:
            sections.append(f"- **Density**: {self.density}")
        if self.absorption_rate:
            sections.append(f"- **Water Absorption**: {self.absorption_rate}")
        
        # Applications
        sections.append(f"\n## Applications")
        if self.recommended_uses:
            sections.append(f"\n### Recommended Uses")
            for use in self.recommended_uses:
                sections.append(f"- {use}")
        
        if self.unsuitable_uses:
            sections.append(f"\n### Not Recommended For")
            for use in self.unsuitable_uses:
                sections.append(f"- {use}")
        
        # Maintenance
        sections.append(f"\n## Maintenance & Care")
        if self.sealing_required:
            sections.append(f"- **Sealing Required**: Yes")
            if self.sealing_frequency:
                sections.append(f"- **Sealing Frequency**: {self.sealing_frequency}")
        else:
            sections.append(f"- **Sealing Required**: No")
        
        if self.cleaning_instructions:
            sections.append(f"\n### Cleaning Instructions")
            sections.append(self.cleaning_instructions)
        
        # Market information
        if self.price_range or self.availability:
            sections.append(f"\n## Market Information")
            if self.price_range:
                sections.append(f"- **Price Range**: {self.price_range}")
            if self.availability:
                sections.append(f"- **Availability**: {self.availability}")
        
        # Related stones
        if self.similar_stones or self.alternative_stones:
            sections.append(f"\n## Related Stones")
            if self.similar_stones:
                sections.append(f"- **Similar Stones**: {', '.join(self.similar_stones)}")
            if self.alternative_stones:
                sections.append(f"- **Alternatives**: {', '.join(self.alternative_stones)}")
        
        # Footer
        sections.append(f"\n---")
        sections.append(f"*This page is part of the STOMATON Natural Stone Knowledge Base.*")
        
        return '\n'.join(sections)


class WikiSyncStatus(BaseModel):
    """Status of wiki synchronization operations"""
    total_stones: int
    synced_count: int
    created_count: int
    updated_count: int
    failed_count: int
    errors: List[Dict[str, Any]] = Field(default_factory=list)
    last_sync: Optional[datetime] = None
    duration_seconds: Optional[float] = None