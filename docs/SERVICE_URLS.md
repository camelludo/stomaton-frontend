# STOMATON Microservices - Service URLs

**Phase 1 Completed**: July 7, 2025  
**Phase 2 Completed**: July 7, 2025  
**Environment**: Production (Railway)  
**Status**: 9/9 services deployed ✅ API Gateway Live!

## Deployed Microservices

### 1. RAG Service
- **URL**: `https://stomaton-rag-service-production.up.railway.app`
- **Health Check**: `https://stomaton-rag-service-production.up.railway.app/api/v1/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: Vector search, embeddings, knowledge retrieval
- **Project**: Main

### 2. Database Service  
- **URL**: `https://stomaton-database-service-production.up.railway.app`
- **Health Check**: `https://stomaton-database-service-production.up.railway.app/api/v1/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: MongoDB operations, data management
- **Project**: Main

### 3. Auth Service
- **URL**: `https://stomaton-auth-service-production.up.railway.app`
- **Health Check**: `https://stomaton-auth-service-production.up.railway.app/api/v1/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: JWT authentication, user management
- **Project**: Main

### 4. Cache Service
- **URL**: `https://stomaton-cache-service-production.up.railway.app`
- **Health Check**: `https://stomaton-cache-service-production.up.railway.app/api/v1/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: Redis caching, session management
- **Project**: Main

### 5. Content Service
- **URL**: `https://stomaton-content-service-production.up.railway.app`
- **Health Check**: `https://stomaton-content-service-production.up.railway.app/api/v1/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: Content generation, categorization, cross-linking
- **Project**: Wiki

### 6. Search Service  
- **URL**: `https://stomaton-search-service-production.up.railway.app`
- **Health Check**: `https://stomaton-search-service-production.up.railway.app/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: Unified search, hybrid MongoDB + Pinecone search
- **Project**: Wiki

### 7. Monitoring Service
- **URL**: `https://stomaton-monitoring-service-production.up.railway.app`
- **Health Check**: `https://stomaton-monitoring-service-production.up.railway.app/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: System monitoring, metrics, alerting
- **Project**: Wiki

### 8. Flywheel Service
- **URL**: `https://stomaton-flywheel-service-production.up.railway.app`
- **Health Check**: `https://stomaton-flywheel-service-production.up.railway.app/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: Automated workflows, content generation cycles
- **Project**: Main



## API Gateway ✅ DEPLOYED

### 9. Gateway Service
- **URL**: `https://stomaton-gateway-production.up.railway.app`
- **Health Check**: `https://stomaton-gateway-production.up.railway.app/health`
- **Status**: ✅ Deployed and operational
- **Purpose**: API Gateway, request routing, rate limiting, CORS handling
- **Project**: Main

## API Gateway Routes

All services are now accessible through the unified gateway:

| Service | Direct URL | Gateway Route |
|---------|------------|---------------|
| Content | `https://stomaton-content-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/content/*` |
| Search | `https://stomaton-search-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/search/*` |
| Monitoring | `https://stomaton-monitoring-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/monitoring/*` |
| Flywheel | `https://stomaton-flywheel-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/flywheel/*` |
| RAG | `https://stomaton-rag-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/rag/*` |
| Database | `https://stomaton-database-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/database/*` |
| Auth | `https://stomaton-auth-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/auth/*` |
| Cache | `https://stomaton-cache-service-production.up.railway.app` | `https://stomaton-gateway-production.up.railway.app/api/v1/cache/*` |

## Environment Variables Summary

### Inter-Service Communication URLs
```bash
# For use in other services
DATABASE_SERVICE_URL=https://stomaton-database-service-production.up.railway.app
RAG_SERVICE_URL=https://stomaton-rag-service-production.up.railway.app  
AUTH_SERVICE_URL=https://stomaton-auth-service-production.up.railway.app
CACHE_SERVICE_URL=https://stomaton-cache-service-production.up.railway.app

# Newly deployed:
CONTENT_SERVICE_URL=https://stomaton-content-service-production.up.railway.app
SEARCH_SERVICE_URL=https://stomaton-search-service-production.up.railway.app
MONITORING_SERVICE_URL=https://stomaton-monitoring-service-production.up.railway.app

# All services deployed:
FLYWHEEL_SERVICE_URL=https://stomaton-flywheel-service-production.up.railway.app
```

## Deployment Summary

**Main Project** (7/9 slots used):
- Unified API (existing)
- RAG Service
- Database Service
- Auth Service
- Cache Service
- Flywheel Service
- Gateway Service ✅ NEW

**Wiki Project** (3/3 slots used):
- Content Service
- Search Service
- Monitoring Service

## Phase 1 Completion Notes

✅ **All services successfully deployed and operational**
✅ **Health checks passing on all services**
✅ **Inter-service communication configured**
✅ **Resilient error handling implemented**

### All Services Operational:
✅ All 8 microservices are fully deployed and operational
✅ Auth Service DATABASE_SERVICE_URL has been configured
✅ All health checks passing
✅ Ready for API Gateway implementation

## Phase 2: API Gateway & Service Mesh ✅ COMPLETE

### Completed:
1. **✅ NGINX API Gateway Deployed**
   - Single entry point: `https://stomaton-gateway-production.up.railway.app`
   - All services routed through `/api/v1/*`
   - Rate limiting configured (100r/s global, 10r/s auth)
   - CORS and security headers implemented

2. **✅ Gateway Features**
   - Health monitoring for all services
   - JSON-formatted centralized logging
   - Request routing with upstream keepalive
   - Custom error pages

3. **✅ All Services Accessible**
   - 8/8 microservices responding through gateway
   - Health checks passing for all services
   - Rate limiting operational

## Phase 3: Feature Integration (Next)

## Technical Details

- **Builder**: NIXPACKS (automatic Python environment detection)
- **Health Check Timeout**: 30 seconds
- **Restart Policy**: ON_FAILURE with 3 max retries
- **Deployment Trigger**: Git push to main branch

**Phase 1 Completed**: July 7, 2025 by Claude Code  
**Architecture**: Microservices (8 services)  
**Next Phase**: API Gateway Implementation