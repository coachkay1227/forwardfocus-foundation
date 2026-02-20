

# Fix: ContactConfirmation.tsx Build Error

## Problem
The `ContactConfirmation.tsx` file uses `npm:` import specifiers which are incompatible with the Deno edge function runtime. All other email templates correctly use `https://esm.sh/` specifiers.

## Root Cause
The file was likely created or modified with incorrect import syntax:
```
// BROKEN (npm: specifiers)
import { Text, Section, Button } from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';
```

## Fix
Update lines 1-2 of `supabase/functions/_shared/email-templates/ContactConfirmation.tsx` to use `https://esm.sh/` imports, matching the pattern used by `BaseEmailTemplate.tsx` and all other email templates:

```
import { Text, Section, Button } from 'https://esm.sh/@react-email/components@0.0.22';
import * as React from 'https://esm.sh/react@18.3.1';
```

## Impact
- Single 2-line change
- No functional changes -- only the import URL format changes
- Resolves the build error immediately
- All other merge changes (RLS migrations, types update) are confirmed working

