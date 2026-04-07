-- Seed representation of the 300+ recognized dog & cat breeds database
-- Contains necessary constants to power the FEDIAF nutritional engine

CREATE TABLE public.breeds_definition (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT CHECK (species IN ('dog', 'cat')) NOT NULL,
    mature_weight_male_kg DECIMAL(5,2),
    mature_weight_female_kg DECIMAL(5,2),
    growth_curve_type TEXT, -- e.g., 'rapid', 'standard', 'slow' (giant breeds)
    health_alerts TEXT[]
);

INSERT INTO public.breeds_definition (code, name, species, mature_weight_male_kg, mature_weight_female_kg, growth_curve_type, health_alerts) VALUES
-- DOGS
('GR', 'Golden Retriever', 'dog', 32.0, 28.0, 'standard', '{"hip_dysplasia", "cancer_risk", "obesity"}'),
('BF', 'Bulldog Francês', 'dog', 12.5, 11.0, 'standard', '{"brachycephalic_syndrome", "spinal_issues"}'),
('PA', 'Pastor Alemão', 'dog', 35.0, 30.0, 'standard', '{"hip_dysplasia", "degenerative_myelopathy"}'),
('ST', 'Shih Tzu', 'dog', 6.5, 6.0, 'rapid', '{"eye_issues", "brachycephalic"}'),
('LB', 'Labrador Retriever', 'dog', 34.0, 30.0, 'standard', '{"obesity", "joint_issues"}'),
('DB', 'Doberman Pinscher', 'dog', 42.0, 34.0, 'standard', '{"DCM", "vWD"}'),
('MD', 'Mastiff', 'dog', 90.0, 75.0, 'slow', '{"gastric_torsion", "joint_load"}'),
-- CATS
('MCO', 'Maine Coon', 'cat', 8.5, 6.0, 'slow', '{"HCM", "SMA"}'),
('PER', 'Persa', 'cat', 5.5, 4.5, 'standard', '{"PKD", "brachycephalic"}'),
('SIA', 'Siamês', 'cat', 4.5, 3.5, 'rapid', '{"asthma", "PRA"}');

-- This is a sample subset. The real DB would contain 360 FCI recognized breeds and TICA recognized cat breeds.
