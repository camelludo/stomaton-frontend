# STOMATON Microservices Architecture Plan

**Created on**: July 4, 2025 at 6:30 PM UTC  
**Created by**: Claude Code  
**Purpose**: Transform STOMATON from unified API to distributed microservices architecture  
**Target Users**: Internal team (15-20), Suppliers (150 factories), Public wiki visitors

## Executive Summary

This document outlines the transformation of STOMATON from a unified monolithic API to a distributed microservices architecture with 8 services total (4 domain services + 4 shared services). The goal is to enable independent feature deployment while maintaining clean architecture with proper service abstraction.

## 1. Architecture Overview

### Current State (Unified API)
```
┌─────────────────────────┐
│   Unified STOMATON API  │
│   /api/v1/stomaton/*    │
│  (All features in one)  │
└────────────┬────────────┘
             │
      ┌──────▼──────┐
      │   MongoDB   │
      └─────────────┘
```

### Target State (Microservices)
```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway / Load Balancer               │
│                     api.stomaton.com                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
    ┌─────────────────┴──────────────────────────────────┐
    │                                                      │
┌───▼─────────┐ ┌────▼──────┐ ┌────▼─────┐ ┌────▼───────┐
│   Content   │ │   Search   │ │ Flywheel │ │ Monitoring │
│   Service   │ │  Service   │ │ Service  │ │  Service   │
│  /api/v1/   │ │ /api/v1/   │ │/api/v1/  │ │ /api/v1/   │
│  content/*  │ │  search/*  │ │flywheel/*│ │monitoring/*│
└──────┬──────┘ └─────┬──────┘ └────┬─────┘ └─────┬──────┘
       │              │              │              │
       └──────────────┴──────┬───────┴──────────────┘
                            │
                ┌───────────▼────────────┐
                │   Shared Services      │
                ├────────────────────────┤
                │ • RAG Service          │
                │ • Database Service     │
                │ • Auth Service         │
                │ • Cache Service        │
                └────────────────────────┘
```

## 2. Service Definitions

### 2.1 Content Service
**Repository**: `stomaton-content-service`  
**Port**: 8001  
**Endpoints**:
- `POST /api/v1/content/generate` - Generate stone content
- `POST /api/v1/content/translate` - Translate content
- `POST /api/v1/content/publish` - Publish to Wiki
- `POST /api/v1/content/cross-link` - Manage content relationships
- `GET /api/v1/content/recent` - Recent generations
- `GET /api/v1/content/stats` - Content statistics

**Responsibilities**:
- AI content generation via Perplexity
- Multi-language translation via DeepL
- Wiki.js publishing
- Cross-linking and categorization
- Content sanitization

### 2.2 Search Service
**Repository**: `stomaton-search-service`  
**Port**: 8002  
**Endpoints**:
- `POST /api/v1/search/query` - RAG search
- `POST /api/v1/search/vector` - Vector similarity search
- `POST /api/v1/search/resolve` - Stone identity resolution
- `GET /api/v1/search/deceptive-practices` - Industry insights
- `POST /api/v1/search/index` - Add to search index

**Responsibilities**:
- MongoDB text search
- Pinecone vector operations
- Stone identity resolution
- Search analytics
- Index management

### 2.3 Flywheel Service
**Repository**: `stomaton-flywheel-service`  
**Port**: 8003  
**Endpoints**:
- `GET /api/v1/flywheel/gaps` - Knowledge gaps
- `POST /api/v1/flywheel/questions` - Generate questions
- `POST /api/v1/flywheel/analyze` - Run analysis
- `GET /api/v1/flywheel/schedule` - View schedule
- `POST /api/v1/flywheel/trigger` - Manual trigger

**Responsibilities**:
- Knowledge gap analysis
- Question generation
- WhatsApp/Email intelligence
- Scheduled automation
- Telegram bot integration

### 2.4 Monitoring Service
**Repository**: `stomaton-monitoring-service`  
**Port**: 8004  
**Endpoints**:
- `GET /api/v1/monitoring/health` - System health
- `GET /api/v1/monitoring/metrics` - Performance metrics
- `GET /api/v1/monitoring/costs` - API cost tracking
- `GET /api/v1/monitoring/alerts` - Active alerts
- `POST /api/v1/monitoring/events` - Log events

**Responsibilities**:
- Health checks
- Performance monitoring
- Cost tracking
- Alert management
- Usage analytics

### 2.5 Gateway Service (NGINX)
**Repository**: `stomaton-gateway`  
**Port**: 80/443  
**Responsibilities**:
- Request routing
- Load balancing
- SSL termination
- CORS handling
- Basic rate limiting

## 3. Shared Services Definitions

### 3.1 RAG Service
**Repository**: `stomaton-rag-service`  
**Port**: 8005  
**Endpoints**:
- `POST /internal/rag/index` - Add document to RAG
- `POST /internal/rag/search` - Search RAG database
- `DELETE /internal/rag/document/{id}` - Remove from RAG
- `GET /internal/rag/stats` - RAG statistics

**Responsibilities**:
- Pinecone vector operations
- OpenAI embeddings generation
- Document chunking and indexing
- Similarity search
- RAG database management

### 3.2 Database Service
**Repository**: `stomaton-database-service`  
**Port**: 8006  
**Endpoints**:
- `POST /internal/db/stones` - Stone CRUD operations
- `POST /internal/db/users` - User management
- `POST /internal/db/search` - MongoDB text search
- `GET /internal/db/collections` - List collections
- `POST /internal/db/query` - Generic queries

**Responsibilities**:
- All MongoDB operations
- Connection pooling
- Query optimization
- Data validation
- Transaction management

### 3.3 Auth Service
**Repository**: `stomaton-auth-service`  
**Port**: 8007  
**Endpoints**:
- `POST /internal/auth/validate` - Validate JWT token
- `POST /internal/auth/create-token` - Generate JWT
- `POST /internal/auth/refresh` - Refresh token
- `GET /internal/auth/user/{id}` - Get user details
- `POST /internal/auth/permissions` - Check permissions

**Responsibilities**:
- JWT token management
- User authentication
- Role-based access control
- Session management
- Permission validation

### 3.4 Cache Service
**Repository**: `stomaton-cache-service`  
**Port**: 8008  
**Endpoints**:
- `GET /internal/cache/{key}` - Get cached value
- `POST /internal/cache/{key}` - Set cache value
- `DELETE /internal/cache/{key}` - Remove from cache
- `POST /internal/cache/flush` - Clear cache
- `GET /internal/cache/stats` - Cache statistics

**Responsibilities**:
- Redis operations
- Cache invalidation strategies
- TTL management
- Distributed caching
- Cache warming

## 4. Shared Components

### 4.1 NPM Packages
```
@stomaton/shared-models   - TypeScript/Pydantic models
@stomaton/shared-utils    - Common utilities
@stomaton/shared-types    - Type definitions
```

### 4.2 Infrastructure
- **MongoDB**: Managed instance for Database Service
- **Redis**: Managed instance for Cache Service
- **Pinecone**: SaaS for RAG Service

## 5. Implementation Phases

### Phase 1: Service Extraction (Weeks 1-2)

**Week 1: Shared Services Setup**
1. Create 4 shared service repositories (RAG, Database, Auth, Cache)
2. Extract database operations to Database Service
3. Extract authentication logic to Auth Service
4. Extract RAG operations to RAG Service
5. Extract caching logic to Cache Service
6. Set up internal service authentication

**Week 2: Domain Services Extraction**
1. Create 4 domain service repositories
2. Extract content logic to Content Service
3. Extract search logic to Search Service
4. Extract flywheel logic to Flywheel Service
5. Extract monitoring logic to Monitoring Service
6. Update to use shared services instead of direct access

### Phase 2: Independent Deployment (Week 3)

1. Deploy each service to Digital Ocean App Platform:
```yaml
# Example: content-service deployment
name: stomaton-content-service
services:
- name: content-api
  github:
    repo: stomaton/content-service
    branch: main
  environment_slug: python
  http_port: 8001
  envs:
  - key: MONGODB_URI
    scope: RUN_TIME
    value: ${mongodb.DATABASE_URL}
  - key: REDIS_URL
    scope: RUN_TIME
    value: ${redis.DATABASE_URL}
```

2. Configure health checks
3. Set up monitoring
4. Test independent deployments

### Phase 3: API Gateway (Week 4, Days 1-3)

1. Deploy NGINX configuration:
```nginx
upstream content_service {
    server content-service:8001;
}

upstream search_service {
    server search-service:8002;
}

location /api/v1/content/ {
    proxy_pass http://content_service/api/v1/content/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location /api/v1/search/ {
    proxy_pass http://search_service/api/v1/search/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

2. Configure JWT validation at gateway
3. Implement rate limiting
4. Set up SSL certificates

### Phase 4: Migration (Week 4, Days 4-5)

1. Run both architectures in parallel
2. Gradually route traffic to new services
3. Monitor for issues
4. Deprecate unified API

## 5. Service Communication

### 5.1 Synchronous Communication (REST)
```python
# Example: Content Service storing data via Database Service
import httpx

async def save_stone(stone_data):
    async with httpx.AsyncClient() as client:
        # Save to database via Database Service
        db_response = await client.post(
            f"{DATABASE_SERVICE_URL}/internal/db/stones",
            json=stone_data,
            headers={"X-Service-Token": SERVICE_TOKEN}
        )
        
        # Index in RAG via RAG Service
        rag_response = await client.post(
            f"{RAG_SERVICE_URL}/internal/rag/index",
            json={
                "document_id": db_response.json()["id"],
                "content": stone_data["content"],
                "metadata": stone_data["metadata"]
            },
            headers={"X-Service-Token": SERVICE_TOKEN}
        )
        
        return {"db_id": db_response.json()["id"], "indexed": True}
```

### 5.2 Asynchronous Communication (Redis Pub/Sub)
```python
# Publisher (Content Service)
import redis

r = redis.from_url(REDIS_URL)
r.publish('stone.created', json.dumps({
    'stone_id': stone_id,
    'name': stone_name,
    'timestamp': datetime.utcnow().isoformat()
}))

# Subscriber (Search Service)
pubsub = r.pubsub()
pubsub.subscribe('stone.created')
for message in pubsub.listen():
    # Update search index
    pass
```

## 6. Configuration Management

### 6.1 Environment Variables
Each service will have its own `.env` file:
```bash
# content-service/.env
SERVICE_NAME=content-service
PORT=8001
# Shared Service URLs
DATABASE_SERVICE_URL=http://database-service:8006
RAG_SERVICE_URL=http://rag-service:8005
AUTH_SERVICE_URL=http://auth-service:8007
CACHE_SERVICE_URL=http://cache-service:8008
# External APIs
PERPLEXITY_API_KEY=...
DEEPL_API_KEY=...
WIKI_API_URL=...
```

### 6.2 Service Discovery
Simple DNS-based discovery using Digital Ocean's private networking:
```python
SERVICES = {
    'content': os.getenv('CONTENT_SERVICE_URL', 'http://content-service:8001'),
    'search': os.getenv('SEARCH_SERVICE_URL', 'http://search-service:8002'),
    'flywheel': os.getenv('FLYWHEEL_SERVICE_URL', 'http://flywheel-service:8003'),
    'monitoring': os.getenv('MONITORING_SERVICE_URL', 'http://monitoring-service:8004'),
}
```

## 7. Development Workflow

### 7.1 Local Development
```bash
# Run all services locally
docker-compose up

# Run specific service
cd content-service
npm run dev
```

### 7.2 Testing Strategy
- Unit tests per service
- Integration tests for service communication
- End-to-end tests through API gateway

### 7.3 Deployment Process
1. Push to service repository
2. CI/CD runs tests
3. Deploy to Digital Ocean App Platform
4. Health check validation
5. Traffic routing update

## 8. Monitoring and Observability

### 8.1 Health Checks
Each service exposes:
- `/health` - Basic health
- `/health/ready` - Readiness check
- `/health/live` - Liveness check

### 8.2 Logging
- Structured JSON logging
- Centralized log aggregation
- Service correlation IDs

### 8.3 Metrics
- Response times per endpoint
- Error rates
- API usage by service
- Cost tracking

## 9. Security Considerations

### 9.1 Service-to-Service Auth
- Internal service tokens
- Mutual TLS (future)
- IP whitelisting on Digital Ocean

### 9.2 Data Protection
- Encryption in transit (HTTPS)
- Encryption at rest (MongoDB)
- Sanitization service remains critical

## 10. Rollback Strategy

If issues arise:
1. Route traffic back to unified API
2. Fix issues in microservices
3. Re-attempt migration
4. Both architectures can run in parallel

## 11. Success Criteria

- [ ] Each service deployable independently
- [ ] No increase in response times
- [ ] Monitoring shows healthy services
- [ ] Team can deploy features without conflicts
- [ ] Cost tracking accurate across services

## 12. Timeline Summary

- **Weeks 1-2**: Service extraction and setup
- **Week 3**: Independent deployment
- **Week 4**: Gateway setup and migration
- **Total**: 4 weeks to production

## Important Note

This architecture is designed for our specific use case:
- Internal team: 15-20 users
- External suppliers: ~150 factories  
- Public wiki: Variable traffic
- **NOT** designed for millions of users
- Prioritizes feature independence over massive scale
- Simple to operate without dedicated DevOps team

The architecture can be scaled up with Kubernetes and more sophisticated tooling if needed in the future, but starts with operational simplicity.