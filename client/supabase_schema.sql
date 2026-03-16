-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE course_status AS ENUM ('draft', 'published');
CREATE TYPE payout_status AS ENUM ('pending', 'paid');

-- Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role user_role DEFAULT 'student',
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Courses Table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  instructor_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  thumbnail_url TEXT,
  status course_status DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Lessons Table
CREATE TABLE lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enrollments Table
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(course_id, student_id)
);

-- Payouts Table
CREATE TABLE payouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  instructor_id UUID REFERENCES profiles(id) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status payout_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for Courses
CREATE POLICY "Published courses are viewable by everyone." ON courses FOR SELECT USING (status = 'published');
CREATE POLICY "Instructors can view their own courses." ON courses FOR SELECT USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors can insert their own courses." ON courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Instructors can update their own courses." ON courses FOR UPDATE USING (auth.uid() = instructor_id);

-- Policies for Lessons
CREATE POLICY "Lessons are viewable by enrolled students or course instructor." ON lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments WHERE enrollments.course_id = lessons.course_id AND enrollments.student_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.instructor_id = auth.uid()
  )
);
CREATE POLICY "Instructors can manage lessons for their courses" ON lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.instructor_id = auth.uid()
  )
);

-- Policies for Enrollments
CREATE POLICY "Users can view their own enrollments." ON enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Instructors can view enrollments for their courses." ON enrollments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM courses WHERE courses.id = enrollments.course_id AND courses.instructor_id = auth.uid()
  )
);
CREATE POLICY "Users can insert their own enrollments." ON enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Policies for Payouts
CREATE POLICY "Instructors can view their own payouts." ON payouts FOR SELECT USING (auth.uid() = instructor_id);

-- Create a function to handle new users and create a profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
