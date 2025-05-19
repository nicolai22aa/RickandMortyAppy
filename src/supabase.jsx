import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yyilhazvvurrajzqtsmj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aWxoYXp2dnVycmFqenF0c21qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY3MjgwMywiZXhwIjoyMDYzMjQ4ODAzfQ.z2B0pk6BfNodPOEeelIxMlxIEwXHHG5FS_nupvMPX4U';
export const supabase = createClient(supabaseUrl, supabaseKey);