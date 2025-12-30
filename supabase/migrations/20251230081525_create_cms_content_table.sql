/*
  # Create CMS Content Table

  1. New Tables
    - `cms_content`
      - `id` (uuid, primary key) - Unique identifier for each content entry
      - `title` (text) - Title of the content
      - `content` (text) - HTML content from CKEditor
      - `editor_type` (text) - Type of editor used (vanillajs or react)
      - `created_at` (timestamptz) - Timestamp when content was created
      - `updated_at` (timestamptz) - Timestamp when content was last updated
      - `user_id` (uuid) - Reference to the user who created the content
  
  2. Security
    - Enable RLS on `cms_content` table
    - Add policy for anyone to read content (public CMS)
    - Add policy for authenticated users to create content
    - Add policy for users to update their own content
    - Add policy for users to delete their own content
*/

CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  editor_type text NOT NULL DEFAULT 'react',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read content"
  ON cms_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create content"
  ON cms_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
  ON cms_content FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
  ON cms_content FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_cms_content_created_at ON cms_content(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_content_editor_type ON cms_content(editor_type);