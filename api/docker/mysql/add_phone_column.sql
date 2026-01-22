-- Migration: Add phone column to applications table
-- Run this script if you already have an existing database

ALTER TABLE applications 
ADD COLUMN phone VARCHAR(20) NOT NULL DEFAULT '+7' 
AFTER full_name;

-- Optional: Update the default constraint if needed
-- ALTER TABLE applications ALTER COLUMN phone DROP DEFAULT;


