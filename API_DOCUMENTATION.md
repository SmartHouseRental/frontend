# API Documentation

This documentation provides an overview of the backend REST endpoints for the **Property**, **Appointments**, and **Messaging** modules. The endpoints use `Bearer` tokens for authentication (JWT) and rely on the database models as defined by Prisma.

## Table of Contents
- [1. Properties API](#1-properties-api)
- [2. Appointments API](#2-appointments-api)
- [3. Messaging API](#3-messaging-api)

---

## 1. Properties API

### Base URL: `/api/v1/properties`
The Property module handles the creation, updating, retrieval, and status management of properties.

### Related Prisma Models/Types
- **Property**: Contains `id`, `type`, `status`, `title` (Json), `description` (Json), `price`, `area`, `bedrooms`, `bathrooms`, `amenities`, `images`, `videos`, etc.
- **PropertyType**: Enum (`VILLA`, `APARTMENT`, `CONDO`, `STUDIO`, `HOUSE`, `PENTHOUSE`)
- **PropertyStatus**: Enum (`AVAILABLE`, `PENDING`, `RENTED`, `UNAVAILABLE`, `MAINTENANCE`)

---

### `GET /`
**Purpose/Description**: Fetch a paginated list of all properties with optional filtering.
- **Authentication**: None required.
- **Query Parameters**:
  - `page` (integer, default: 1)
  - `limit` (integer, default: 12)
  - `status` (string, enum: `PropertyStatusValues`)
  - `type` (string, enum: `PropertyTypeEnum`)
  - `minPrice` (number)
  - `maxPrice` (number)
  - `bedrooms` (integer)
  - `bathrooms` (integer)
  - `sortBy` (string, enum: `createdAt`, `price`, `viewsCount`)
  - `order` (string, enum: `asc`, `desc`)
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": [{ /* Property object */ }],
    "meta": {
      "total": 50,
      "page": 1,
      "limit": 12,
      "totalPages": 5
    }
  }
  ```

### `GET /my`
**Purpose/Description**: Get properties created by the logged-in owner.
- **Authentication**: Bearer Token (`requireAuth`).
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": [{ /* Property object */ }]
  }
  ```
- **Error Responses**: `401 Unauthorized`

### `GET /analytics`
**Purpose/Description**: Get property analytics for the authenticated owner.
- **Authentication**: Bearer Token (`requireAuth`).
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "totalProperties": 6,
      "available": 3,
      "rented": 2,
      "pending": 1,
      "totalViews": 5171
    }
  }
  ```
- **Error Responses**: `401 Unauthorized`

### `GET /{propertyId}`
**Purpose/Description**: Get detailed information for a specific property.
- **Authentication**: None required.
- **Path Parameters**:
  - `propertyId` (string, required): ID of the property.
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": "ckv1...",
      "title": { "en": "Modern Villa", "am": "..." },
      ...
    }
  }
  ```
- **Error Responses**: `404 Not Found`

### `POST /`
**Purpose/Description**: Create a new property (Owners only). Supports `multipart/form-data` file uploads.
- **Authentication**: Bearer Token (`requireAuth`).
- **Required Headers**: `Content-Type: multipart/form-data`
- **Request Body (FormData)**:
  - `type` (PropertyTypeEnum)
  - `title` (JSON string, `{ "en": "...", "am": "..." }`)
  - `description` (JSON string)
  - `location` (string)
  - `address` (string, optional)
  - `price` (number)
  - `bedrooms` (integer, optional)
  - `bathrooms` (integer, optional)
  - `area` (number, optional)
  - `amenities` (JSON array, optional)
  - `furnishingType` (string, optional)
  - `images` (Files, via Multer max 10)
  - `videos` (Files, via Multer max 5)
- **Validation Requirements**: Strictly checked via Zod (positive price, valid enums).
- **Success Response (201)**:
  ```json
  {
    "status": "success",
    "data": { /* Property object */ }
  }
  ```
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`

### `PATCH /{propertyId}`
**Purpose/Description**: Update a property (Owner only).
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `propertyId` (string, required)
- **Request Body (JSON)**: All fields optional, same types as creation.
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": { /* Updated Property object */ }
  }
  ```
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`

### `DELETE /{propertyId}`
**Purpose/Description**: Soft delete a property (Owner only).
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `propertyId` (string, required)
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": null
  }
  ```
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

### `PATCH /{propertyId}/status`
**Purpose/Description**: Update a property's status directly (Owner only).
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `propertyId` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "status": "RENTED"
  }
  ```
- **Validation**: Status must be `AVAILABLE`, `PENDING`, `RENTED`, `UNAVAILABLE`, or `MAINTENANCE`.
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": { /* Updated Property object */ }
  }
  ```

---

## 2. Appointments API

### Base URL: `/api/v1/appointments`
Manages scheduling property visits between renters and owners. Automatically checks for double-bookings.

### Related Prisma Models/Types
- **Appointment**: Contains `id`, `propertyId`, `renterId`, `ownerId`, `startsAt`, `endsAt`, `status`, `note`.
- **AppointmentStatus**: Enum (`PENDING`, `ACCEPTED`, `REJECTED`)

---

### `POST /`
**Purpose/Description**: Book a property visit appointment.
- **Authentication**: Bearer Token (`requireAuth`) - Renters only.
- **Request Body (JSON)**:
  ```json
  {
    "propertyId": "ckv1...",
    "startsAt": "2026-03-22T10:00:00.000Z",
    "endsAt": "2026-03-22T10:30:00.000Z",
    "note": "Optional note for owner"
  }
  ```
- **Validation Requirements**: `endsAt` > `startsAt`. Renter cannot book overlapping appointments.
- **Success Response (201)**:
  ```json
  {
    "status": "success",
    "data": { "appointment": { /* Appointment object */ } }
  }
  ```
- **Error Responses**: `400 Bad Request`, `403 Forbidden`, `404 Not Found`, `409 Conflict`

### `GET /`
**Purpose/Description**: View appointment schedule.
- **Authentication**: Bearer Token (`requireAuth`).
- **Query Parameters**:
  - `status` (string, optional: `PENDING`, `ACCEPTED`, `REJECTED`)
  - `propertyId` (string, optional)
  - `from` (ISO DateTime, optional)
  - `to` (ISO DateTime, optional)
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "appointments": [{ /* Appointments List */ }]
    }
  }
  ```

### `PATCH /{id}/status`
**Purpose/Description**: Accept or reject an appointment (Owner/Admin only).
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "status": "ACCEPTED"
  }
  ```
- **Validation**: Blocks confirmation if the owner already has an overlapping `ACCEPTED` appointment.
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": { "appointment": { /* Updated Appointment */ } }
  }
  ```
- **Error Responses**: `403 Forbidden`, `404 Not Found`, `409 Conflict` (overlapping slot)

### `PATCH /{id}/note`
**Purpose/Description**: Update the appointment note (Owner/Admin only).
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "note": "Bring ID"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": { "appointment": { /* Updated Appointment */ } }
  }
  ```

### `DELETE /{id}`
**Purpose/Description**: Delete an appointment. Allowed for participant renter, owner, or admin.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": { "id": "appt_123" }
  }
  ```
- **Error Responses**: `403 Forbidden`

---

## 3. Messaging API

### Base URL: `/api/v1/messaging`
Handles 1-on-1 conversations, standard messages, attachments, emoji reactions, and read receipts.

### Related Prisma Models/Types
- **Conversation**: Links `renterId`, `ownerId`, and optional `propertyId`.
- **Message**: Contains `id`, `conversationId`, `senderId`, `type`, `content`, `status`, `replyToId`.
- **MessageType**: Enum (`TEXT`, `IMAGE`, `VIDEO`, `AUDIO`, `FILE`)
- **MessageStatus**: Enum (`SENT`, `DELIVERED`, `READ`)
- **MessageAttachment**: Embedded media model for messages.
- **MessageReaction**: Emoji reactions per user and message.

---

### `GET /conversations`
**Purpose/Description**: List conversations for the currently logged-in user.
- **Authentication**: Bearer Token (`requireAuth`).
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "conversations": [{ /* Conversation list */ }]
    }
  }
  ```

### `POST /conversations`
**Purpose/Description**: Create a new conversation or return an existing one between users.
- **Authentication**: Bearer Token (`requireAuth`).
- **Request Body (JSON)**:
  ```json
  {
    "ownerId": "usr_owner_1",
    "renterId": "usr_renter_1",
    "propertyId": "prop_123" 
  }
  ```
- **Validation**: `propertyId` is optional.
- **Success Response (201)**:
  ```json
  {
    "status": "success",
    "data": { "conversation": { /* Conversation object */ } }
  }
  ```

### `GET /conversations/{id}`
**Purpose/Description**: Get metadata for a specific conversation.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required) - Conversation ID.
- **Success Response (200)**: Returns conversation basic details.
- **Error Responses**: `404 Not Found`

### `GET /conversations/{id}/messages`
**Purpose/Description**: List paginated messages inside a conversation.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required) - Conversation ID.
- **Query Parameters**:
  - `limit` (integer, max 100, default 30)
  - `cursor` (string, optional) - Message ID for pagination.
- **Success Response (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "messages": [{ /* Messages array */ }],
      "nextCursor": "msg_999"
    }
  }
  ```

### `POST /conversations/{id}/messages`
**Purpose/Description**: Send a standard text message.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "content": "Hello, is the property available?",
    "replyToId": "msg_001" 
  }
  ```
- **Validation**: Content max length 2000.
- **Success Response (201)**:
  ```json
  {
    "status": "success",
    "data": { "message": { /* Newly created message */ } }
  }
  ```

### `POST /conversations/{id}/attachments`
**Purpose/Description**: Send a message with a file attachment.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Required Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `file` (Binary File - required)
  - `caption` (string, optional)
  - `replyToId` (string, optional)
- **Success Response (201)**: Returns created message object with attachment URL.
- **Error Responses**: `400 Bad Request` (File missing).

### `PATCH /conversations/{id}/read`
**Purpose/Description**: Mark all messages in the conversation as `READ` for the logged-in user.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Success Response (200)**: Confirmation of mark as read.

### `PATCH /messages/{id}/status`
**Purpose/Description**: Update a specific message's status.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required) - Message ID.
- **Request Body (JSON)**:
  ```json
  {
    "status": "READ"
  }
  ```
- **Validation**: Accepts `DELIVERED` or `READ`.
- **Success Response (200)**: Returns updated message.

### `POST /messages/{id}/reactions`
**Purpose/Description**: Add an emoji reaction to a message.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "emoji": "👍"
  }
  ```
- **Validation**: Must be a valid pictographic emoji character.
- **Success Response (200)**: Returns message with added reaction.

### `DELETE /messages/{id}/reactions`
**Purpose/Description**: Remove an emoji reaction from a message.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Request Body (JSON)**:
  ```json
  {
    "emoji": "👍"
  }
  ```
- **Success Response (200)**: Returns updated message without the reaction.

### `DELETE /messages/{id}`
**Purpose/Description**: Delete a message. Only the sender can delete their own message.
- **Authentication**: Bearer Token (`requireAuth`).
- **Path Parameters**: `id` (string, required)
- **Success Response (200)**: Success message.
- **Error Responses**: `403 Forbidden`
