
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbfapbzfciptsuihgjob.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZmFwYnpmY2lwdHN1aWhnam9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NTE3MDIsImV4cCI6MjAyNjAyNzcwMn0.r8e-5qJRtSJu2CW-onpH5j5PS3SGRiPse13_-dUiH5g'
export const Supabase = createClient(supabaseUrl, supabaseKey)