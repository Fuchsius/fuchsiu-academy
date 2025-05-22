# API Route Fixes

To fix all API route files with the auth() function, you need to do the following in each file:

1. Replace:

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
```

With:

```typescript
import { auth } from "@/auth";
```

2. Replace:

```typescript
const session = await getServerSession(authOptions);
```

With:

```typescript
const session = await auth();
```

Apply these changes to the following files:

- app/api/admin/students/route.ts
- app/api/admin/students/[id]/route.ts
- app/api/admin/certificates/route.ts
- app/api/admin/certificates/[id]/route.ts
- app/api/admin/orders/route.ts
- app/api/admin/orders/[id]/route.ts

3. For the Prisma model issues, make sure your Prisma schema is properly generated with:

```bash
npx prisma generate
```

This will ensure the client has all the required models defined.
