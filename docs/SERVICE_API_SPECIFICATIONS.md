# Service API Specifications

**Created on**: July 4, 2025 at 7:45 PM UTC  
**Created by**: Claude Code  
**Purpose**: Detailed API specifications for all 8 microservices in the STOMATON architecture  
**Version**: 1.0.0

## Overview

This document provides comprehensive API specifications for each of the 8 services in the STOMATON microservices architecture. Services are divided into:
- **Domain Services** (4): Public-facing APIs
- **Shared Services** (4): Internal APIs used by domain services

## Table of Contents

1. [Domain Services](#domain-services)
   - [Content Service](#1-content-service)
   - [Search Service](#2-search-service)
   - [Flywheel Service](#3-flywheel-service)
   - [Monitoring Service](#4-monitoring-service)

2. [Shared Services](#shared-services)
   - [RAG Service](#5-rag-service)
   - [Database Service](#6-database-service)
   - [Auth Service](#7-auth-service)
   - [Cache Service](#8-cache-service)

3. [Common Standards](#common-standards)

---

## Domain Services

### 1. Content Service

**Base URL**: `https://api.stomaton.com/api/v1/content`  
**Port**: 8001  
**Authentication**: JWT Bearer Token

#### Endpoints

##### POST /generate
Generate comprehensive stone content.

**Request Body**:
```json
{
  "stone_name": "string",
  "force_refresh": false,
  "aliases": {
    "commercial": ["string"],
    "regional": ["string"]
  }
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "content": {
    "name": "string",
    "research_data": {},
    "wiki_content": "string",
    "generated_at": "2025-07-04T19:45:00Z",
    "categories": {},
    "cross_links": ["string"]
  },
  "cost": {
    "total": 1.44,
    "breakdown": {}
  },
  "processing_time": 2.5
}
```

##### POST /translate
Translate content to multiple languages.

**Request Body**:
```json
{
  "content": "string",
  "target_languages": ["es", "fr", "de", "it", "pt"],
  "stone_name": "string"
}
```

**Response** (200 OK):
```json
{
  "translations": {
    "es": "string",
    "fr": "string",
    "de": "string",
    "it": "string",
    "pt": "string"
  },
  "cost": 0.22,
  "characters_translated": 1000
}
```

##### POST /publish
Publish content to Wiki.js.

**Request Body**:
```json
{
  "stone_name": "string",
  "content": "string",
  "translations": {},
  "metadata": {}
}
```

**Response** (200 OK):
```json
{
  "status": "published",
  "wiki_urls": {
    "en": "https://wiki.stomaton.com/stones/rainbow-moonstone",
    "es": "https://wiki.stomaton.com/es/stones/rainbow-moonstone"
  },
  "pages_created": 6
}
```

##### POST /cross-link
Generate cross-links between related stones.

**Request Body**:
```json
{
  "stone_name": "string",
  "content": "string",
  "existing_stones": ["string"],
  "categories": {}
}
```

**Response** (200 OK):
```json
{
  "cross_links": [
    {
      "stone": "Blue Moonstone",
      "relevance_score": 0.92,
      "reason": "same_family"
    }
  ],
  "method": "taxonomy_based"
}
```

##### GET /recent
Get recently generated content.

**Query Parameters**:
- `limit` (optional): Number of results (default: 10)
- `offset` (optional): Pagination offset

**Response** (200 OK):
```json
{
  "recent": [
    {
      "stone_name": "string",
      "generated_at": "2025-07-04T19:45:00Z",
      "generated_by": "user@example.com",
      "cost": 1.44
    }
  ],
  "total": 150,
  "limit": 10,
  "offset": 0
}
```

##### GET /stats
Get content generation statistics.

**Response** (200 OK):
```json
{
  "total_generated": 1500,
  "generated_today": 25,
  "total_cost": 2160.00,
  "average_cost_per_stone": 1.44,
  "languages_supported": 6,
  "wiki_pages_published": 9000
}
```

---

### 2. Search Service

**Base URL**: `https://api.stomaton.com/api/v1/search`  
**Port**: 8002  
**Authentication**: JWT Bearer Token

#### Endpoints

##### POST /query
Search for stones using RAG.

**Request Body**:
```json
{
  "query": "string",
  "limit": 10,
  "filters": {
    "stone_type": "string",
    "price_range": "string",
    "origin": "string"
  }
}
```

**Response** (200 OK):
```json
{
  "results": [
    {
      "stone_name": "string",
      "relevance_score": 0.95,
      "snippet": "string",
      "categories": {},
      "source": "rag"
    }
  ],
  "total_found": 25,
  "search_method": "hybrid"
}
```

##### POST /resolve-identity
Resolve stone name to canonical identity.

**Request Body**:
```json
{
  "query": "string"
}
```

**Response** (200 OK):
```json
{
  "status": "resolved",
  "canonical_name": "Rainbow Moonstone",
  "resolved_from": "marketing",
  "confidence": 0.98,
  "all_aliases": {
    "commercial": ["string"],
    "regional": ["string"],
    "marketing": ["string"],
    "deceptive": ["string"]
  },
  "warnings": [
    {
      "type": "deceptive_name",
      "message": "string",
      "severity": "high"
    }
  ]
}
```

##### GET /deceptive-practices
Get information about deceptive naming in the industry.

**Response** (200 OK):
```json
{
  "practices": [
    {
      "category": "misleading_origins",
      "examples": [],
      "impact": "high",
      "consumer_tips": ["string"]
    }
  ],
  "total_documented": 45,
  "last_updated": "2025-07-04"
}
```

##### POST /vector-search
Perform vector similarity search.

**Request Body**:
```json
{
  "query": "string",
  "top_k": 10,
  "threshold": 0.7
}
```

**Response** (200 OK):
```json
{
  "matches": [
    {
      "stone_name": "string",
      "similarity_score": 0.92,
      "metadata": {}
    }
  ],
  "search_time_ms": 45
}
```

---

### 3. Flywheel Service

**Base URL**: `https://api.stomaton.com/api/v1/flywheel`  
**Port**: 8003  
**Authentication**: JWT Bearer Token (Admin endpoints require admin role)

#### Endpoints

##### GET /gaps
Get current knowledge gaps (Admin only).

**Query Parameters**:
- `source` (optional): Filter by source (whatsapp, search, telegram)
- `limit` (optional): Number of results

**Response** (200 OK):
```json
{
  "gaps": [
    {
      "id": "string",
      "stone_name": "string",
      "gap_type": "missing_content",
      "priority": "high",
      "source": "failed_search",
      "identified_at": "2025-07-04T19:45:00Z",
      "frequency": 15
    }
  ],
  "total_gaps": 127,
  "by_source": {
    "whatsapp": 45,
    "failed_search": 67,
    "telegram": 15
  }
}
```

##### POST /questions
Generate questions based on gaps.

**Request Body**:
```json
{
  "gap_ids": ["string"],
  "question_types": ["technical", "practical", "sourcing"],
  "count": 10
}
```

**Response** (200 OK):
```json
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "gap_id": "string",
      "priority": "high",
      "category": "technical"
    }
  ],
  "total_generated": 10
}
```

##### POST /trigger/daily-analysis
Trigger daily knowledge analysis.

**Request Body**:
```json
{
  "analyze_sources": ["whatsapp", "telegram", "search_logs"],
  "date_range": {
    "start": "2025-07-03",
    "end": "2025-07-04"
  }
}
```

**Response** (202 Accepted):
```json
{
  "status": "started",
  "job_id": "string",
  "estimated_completion": "2025-07-04T20:00:00Z"
}
```

##### GET /automation/status
Get automation status.

**Response** (200 OK):
```json
{
  "daily_analysis": {
    "enabled": true,
    "last_run": "2025-07-04T00:00:00Z",
    "next_run": "2025-07-05T00:00:00Z",
    "status": "success"
  },
  "question_generation": {
    "enabled": true,
    "frequency": "weekly"
  },
  "telegram_bot": {
    "status": "active",
    "messages_processed_today": 145
  }
}
```

##### POST /telegram/webhook
Telegram bot webhook endpoint.

**Headers**:
- `X-Telegram-Bot-Api-Secret-Token`: Telegram secret

**Request Body**: Telegram Update object

**Response** (200 OK): Empty response

---

### 4. Monitoring Service

**Base URL**: `https://api.stomaton.com/api/v1/monitoring`  
**Port**: 8004  
**Authentication**: JWT Bearer Token

#### Endpoints

##### GET /health
Overall system health.

**Response** (200 OK):
```json
{
  "status": "healthy",
  "services": {
    "content": "healthy",
    "search": "healthy",
    "flywheel": "healthy",
    "monitoring": "healthy",
    "rag": "healthy",
    "database": "healthy",
    "auth": "healthy",
    "cache": "healthy"
  },
  "timestamp": "2025-07-04T19:45:00Z"
}
```

##### GET /metrics
System metrics.

**Query Parameters**:
- `period` (optional): Time period (1h, 24h, 7d, 30d)
- `service` (optional): Filter by service

**Response** (200 OK):
```json
{
  "metrics": {
    "requests": {
      "total": 45000,
      "per_service": {},
      "average_response_time_ms": 234
    },
    "errors": {
      "total": 12,
      "by_type": {}
    },
    "uptime_percentage": 99.98
  },
  "period": "24h"
}
```

##### GET /costs
API cost tracking.

**Query Parameters**:
- `period` (optional): Time period
- `group_by` (optional): service, api_provider, user

**Response** (200 OK):
```json
{
  "costs": {
    "total": 432.50,
    "by_provider": {
      "perplexity": 350.00,
      "openai": 12.50,
      "deepl": 70.00
    },
    "by_service": {
      "content": 400.00,
      "search": 32.50
    }
  },
  "period": "24h",
  "stones_generated": 300
}
```

##### GET /alerts/active
Get active alerts.

**Response** (200 OK):
```json
{
  "alerts": [
    {
      "id": "string",
      "severity": "warning",
      "service": "content",
      "message": "High API costs detected",
      "triggered_at": "2025-07-04T19:45:00Z",
      "threshold": 500,
      "current_value": 520
    }
  ],
  "total": 2
}
```

##### POST /alerts/rules
Create alert rule.

**Request Body**:
```json
{
  "name": "High Cost Alert",
  "condition": {
    "metric": "api_cost_hourly",
    "operator": "greater_than",
    "threshold": 50
  },
  "severity": "warning",
  "notification_channels": ["email", "slack"]
}
```

**Response** (201 Created):
```json
{
  "id": "string",
  "name": "High Cost Alert",
  "created_at": "2025-07-04T19:45:00Z",
  "status": "active"
}
```

---

## Shared Services

### 5. RAG Service

**Base URL**: Internal only - `http://rag-service:8005/internal/rag`  
**Port**: 8005  
**Authentication**: Service Token

#### Endpoints

##### POST /index
Add document to RAG index.

**Headers**:
- `X-Service-Token`: Service authentication token

**Request Body**:
```json
{
  "document_id": "string",
  "content": "string",
  "metadata": {
    "stone_name": "string",
    "categories": {},
    "timestamp": "2025-07-04T19:45:00Z"
  },
  "chunking_strategy": "semantic"
}
```

**Response** (200 OK):
```json
{
  "indexed": true,
  "chunks_created": 5,
  "embedding_dimension": 1536,
  "index_name": "stomaton-stone-db"
}
```

##### POST /search
Search RAG database.

**Request Body**:
```json
{
  "query": "string",
  "top_k": 10,
  "filter": {
    "stone_type": "string"
  },
  "include_metadata": true
}
```

**Response** (200 OK):
```json
{
  "results": [
    {
      "document_id": "string",
      "score": 0.92,
      "content": "string",
      "metadata": {}
    }
  ],
  "search_time_ms": 45
}
```

##### DELETE /document/{document_id}
Remove document from RAG.

**Response** (200 OK):
```json
{
  "deleted": true,
  "chunks_removed": 5
}
```

##### GET /stats
RAG statistics.

**Response** (200 OK):
```json
{
  "total_documents": 1500,
  "total_chunks": 7500,
  "index_size_mb": 450,
  "average_chunk_size": 512,
  "last_indexed": "2025-07-04T19:45:00Z"
}
```

---

### 6. Database Service

**Base URL**: Internal only - `http://database-service:8006/internal/db`  
**Port**: 8006  
**Authentication**: Service Token

#### Endpoints

##### POST /stones
Stone CRUD operations.

**Request Body**:
```json
{
  "operation": "create|read|update|delete",
  "data": {
    "name": "string",
    "content": {},
    "metadata": {}
  },
  "filter": {
    "_id": "string",
    "name": "string"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "operation": "create",
  "document_id": "string",
  "affected_documents": 1
}
```

##### POST /users
User management operations.

**Request Body**:
```json
{
  "operation": "create|read|update|delete",
  "data": {
    "email": "string",
    "role": "user|admin",
    "tier": "basic|premium"
  },
  "filter": {
    "_id": "string",
    "email": "string"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "_id": "string",
    "email": "string",
    "role": "user",
    "created_at": "2025-07-04T19:45:00Z"
  }
}
```

##### POST /query
Generic database queries.

**Request Body**:
```json
{
  "collection": "string",
  "filter": {},
  "projection": {},
  "sort": {},
  "limit": 10,
  "skip": 0
}
```

**Response** (200 OK):
```json
{
  "documents": [],
  "total": 150,
  "executed_in_ms": 12
}
```

##### POST /aggregate
Aggregation pipelines.

**Request Body**:
```json
{
  "collection": "string",
  "pipeline": []
}
```

**Response** (200 OK):
```json
{
  "results": [],
  "executed_in_ms": 45
}
```

---

### 7. Auth Service

**Base URL**: Internal only - `http://auth-service:8007/internal/auth`  
**Port**: 8007  
**Authentication**: Service Token

#### Endpoints

##### POST /validate
Validate JWT token.

**Request Body**:
```json
{
  "token": "string"
}
```

**Response** (200 OK):
```json
{
  "valid": true,
  "user": {
    "id": "string",
    "email": "string",
    "role": "user",
    "tier": "premium"
  },
  "expires_at": "2025-07-05T19:45:00Z"
}
```

##### POST /create-token
Generate JWT token.

**Request Body**:
```json
{
  "user_id": "string",
  "email": "string",
  "role": "user",
  "tier": "basic",
  "expires_in": 86400
}
```

**Response** (200 OK):
```json
{
  "token": "string",
  "token_type": "Bearer",
  "expires_at": "2025-07-05T19:45:00Z"
}
```

##### POST /refresh
Refresh JWT token.

**Request Body**:
```json
{
  "refresh_token": "string"
}
```

**Response** (200 OK):
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_at": "2025-07-05T19:45:00Z"
}
```

##### POST /permissions
Check user permissions.

**Request Body**:
```json
{
  "user_id": "string",
  "resource": "string",
  "action": "read|write|delete"
}
```

**Response** (200 OK):
```json
{
  "allowed": true,
  "reason": "user_has_admin_role"
}
```

---

### 8. Cache Service

**Base URL**: Internal only - `http://cache-service:8008/internal/cache`  
**Port**: 8008  
**Authentication**: Service Token

#### Endpoints

##### GET /{key}
Get cached value.

**Response** (200 OK):
```json
{
  "value": {},
  "ttl_remaining": 3400,
  "created_at": "2025-07-04T19:45:00Z"
}
```

**Response** (404 Not Found):
```json
{
  "error": "key_not_found"
}
```

##### POST /{key}
Set cache value.

**Request Body**:
```json
{
  "value": {},
  "ttl": 3600,
  "tags": ["stone", "content"]
}
```

**Response** (200 OK):
```json
{
  "cached": true,
  "expires_at": "2025-07-04T20:45:00Z"
}
```

##### DELETE /{key}
Remove from cache.

**Response** (200 OK):
```json
{
  "deleted": true
}
```

##### POST /flush
Clear cache by pattern or tags.

**Request Body**:
```json
{
  "pattern": "stone:*",
  "tags": ["stone"]
}
```

**Response** (200 OK):
```json
{
  "flushed": 145,
  "pattern": "stone:*"
}
```

##### GET /stats
Cache statistics.

**Response** (200 OK):
```json
{
  "total_keys": 1500,
  "memory_used_mb": 125,
  "hit_rate": 0.87,
  "miss_rate": 0.13,
  "evictions_today": 45
}
```

---

## Common Standards

### Authentication

#### Domain Services
All domain services use JWT Bearer tokens:
```
Authorization: Bearer <jwt_token>
```

#### Shared Services
Internal services use service tokens:
```
X-Service-Token: <service_token>
```

### Error Responses

All services use consistent error format:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Stone not found",
    "details": {},
    "request_id": "req_123456"
  }
}
```

Common HTTP status codes:
- `200 OK` - Success
- `201 Created` - Resource created
- `202 Accepted` - Async operation started
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Missing/invalid auth
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Rate Limiting

Domain services implement rate limiting:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1625097600
```

### Pagination

Standard pagination for list endpoints:
```json
{
  "data": [],
  "pagination": {
    "total": 1500,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

### Health Checks

All services implement standard health endpoints:
- `/health` - Basic health
- `/health/ready` - Readiness check
- `/health/live` - Liveness check

### Versioning

API version in URL path: `/api/v1/...`

Future versions will maintain backward compatibility or use new version prefix.