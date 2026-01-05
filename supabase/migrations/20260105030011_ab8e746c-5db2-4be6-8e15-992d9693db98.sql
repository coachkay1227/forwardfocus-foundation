-- Seed Ohio community resources for AI bots to recommend
INSERT INTO public.resources (name, title, description, category, organization, type, state, state_code, city, county, phone, email, website_url, address, tags, verified, justice_friendly) VALUES

-- CRISIS & EMERGENCY SERVICES
('Ohio Crisis Hotline', '24/7 Mental Health Crisis Support', 'Free, confidential crisis support available 24 hours a day, 7 days a week for anyone experiencing mental health crisis or emotional distress.', 'crisis', 'Ohio Department of Mental Health', 'hotline', 'Ohio', 'OH', NULL, NULL, '1-800-273-8255', NULL, 'https://mha.ohio.gov/get-help/crisis-resources', NULL, ARRAY['crisis', 'mental health', '24/7', 'suicide prevention'], true, true),

('National Domestic Violence Hotline', 'Domestic Violence Support & Safety Planning', 'Confidential support for victims of domestic violence. Trained advocates provide safety planning, resources, and emotional support 24/7.', 'crisis', 'National Domestic Violence Hotline', 'hotline', 'Ohio', 'OH', NULL, NULL, '1-800-799-7233', NULL, 'https://www.thehotline.org', NULL, ARRAY['domestic violence', 'crisis', 'safety', 'victim services'], true, true),

('Ohio Crime Victim Services', 'Victim Compensation & Advocacy', 'Financial assistance and advocacy services for victims of violent crime in Ohio. Covers medical expenses, lost wages, and counseling.', 'victim-services', 'Ohio Attorney General', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '1-800-582-2877', 'victimservices@ohioago.gov', 'https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims', '30 E Broad St, Columbus, OH 43215', ARRAY['victim compensation', 'crime victims', 'financial assistance'], true, true),

-- HOUSING ASSISTANCE
('Coalition on Homelessness and Housing in Ohio', 'Statewide Housing Resources', 'Connects individuals and families with emergency shelter, transitional housing, and permanent supportive housing across Ohio.', 'housing', 'COHHIO', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-280-1984', 'info@cohhio.org', 'https://cohhio.org', '175 S Third St, Columbus, OH 43215', ARRAY['housing', 'homeless', 'shelter', 'transitional housing'], true, true),

('Ohio Housing Finance Agency', 'Affordable Housing Programs', 'State agency providing affordable housing opportunities including down payment assistance, rental assistance, and fair housing resources.', 'housing', 'OHFA', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-466-7970', NULL, 'https://ohiohome.org', '57 E Main St, Columbus, OH 43215', ARRAY['housing', 'rental assistance', 'homeownership', 'affordable housing'], true, true),

('Community Shelter Board', 'Central Ohio Homeless Services', 'Coordinates homeless services in Franklin County including emergency shelter, rapid rehousing, and prevention programs.', 'housing', 'Community Shelter Board', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-221-9195', NULL, 'https://csb.org', '355 E Campus View Blvd, Columbus, OH 43235', ARRAY['housing', 'homeless', 'Columbus', 'Franklin County'], true, true),

-- EMPLOYMENT & WORKFORCE
('OhioMeansJobs', 'Statewide Employment Services', 'Free job search assistance, resume help, skills training, and career counseling at locations throughout Ohio. Special programs for justice-impacted individuals.', 'employment', 'Ohio Department of Job and Family Services', 'government', 'Ohio', 'OH', NULL, NULL, '1-888-296-7541', NULL, 'https://ohiomeansjobs.ohio.gov', NULL, ARRAY['employment', 'job search', 'training', 'career'], true, true),

('Alvis Inc', 'Reentry Employment Services', 'Comprehensive reentry services including job training, placement assistance, and supportive employment for justice-impacted individuals.', 'employment', 'Alvis Inc', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-252-8402', NULL, 'https://alvis180.org', '2100 Stella Ct, Columbus, OH 43215', ARRAY['reentry', 'employment', 'job training', 'justice-impacted'], true, true),

('Goodwill Columbus', 'Job Training & Placement', 'Career services including job training, resume assistance, interview coaching, and job placement. Multiple locations across Central Ohio.', 'employment', 'Goodwill Columbus', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-294-5181', NULL, 'https://goodwillcolumbus.org', '1331 Edgehill Rd, Columbus, OH 43212', ARRAY['employment', 'job training', 'career services'], true, true),

-- LEGAL AID
('Ohio State Legal Services', 'Free Civil Legal Help', 'Free legal assistance for low-income Ohioans in civil matters including housing, family law, public benefits, and consumer issues.', 'legal', 'Ohio State Legal Services Association', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '1-866-529-6446', NULL, 'https://www.ohiolegalservices.org', '1108 City Park Ave, Columbus, OH 43206', ARRAY['legal aid', 'civil legal', 'free legal help'], true, true),

('Ohio Justice Foundation', 'Legal Resources for Reentry', 'Helps justice-impacted individuals with record sealing, expungement, and other legal barriers to reentry.', 'legal', 'Ohio Justice Foundation', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-715-1234', NULL, 'https://www.ohiojf.org', NULL, ARRAY['legal', 'expungement', 'record sealing', 'reentry'], true, true),

('Legal Aid Society of Cleveland', 'Northeast Ohio Legal Services', 'Free civil legal services for low-income residents of Cuyahoga, Ashtabula, Geauga, Lake, and Lorain counties.', 'legal', 'Legal Aid Society of Cleveland', 'nonprofit', 'Ohio', 'OH', 'Cleveland', 'Cuyahoga', '216-687-1900', NULL, 'https://lasclev.org', '1223 W 6th St, Cleveland, OH 44113', ARRAY['legal aid', 'Cleveland', 'civil legal', 'Cuyahoga County'], true, true),

-- MENTAL HEALTH & COUNSELING
('ADAMH Board of Franklin County', 'Mental Health & Addiction Services', 'Funds and coordinates mental health and addiction services throughout Franklin County. Crisis services available 24/7.', 'healthcare', 'ADAMH Board', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-224-1057', NULL, 'https://adamhfranklin.org', '447 E Broad St, Columbus, OH 43215', ARRAY['mental health', 'addiction', 'crisis', 'counseling'], true, true),

('Ohio Guidestone', 'Mental Health & Family Services', 'Comprehensive behavioral health services including counseling, psychiatric services, and family support programs across Ohio.', 'healthcare', 'Ohio Guidestone', 'nonprofit', 'Ohio', 'OH', NULL, NULL, '1-888-264-4769', NULL, 'https://ohioguidestone.org', NULL, ARRAY['mental health', 'counseling', 'family services', 'behavioral health'], true, true),

('Netcare Access', 'Psychiatric Crisis Services', '24-hour psychiatric emergency services in Franklin County. Walk-in crisis assessment and stabilization.', 'healthcare', 'Netcare Access', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-276-2273', NULL, 'https://netcareaccess.org', '199 S Central Ave, Columbus, OH 43223', ARRAY['crisis', 'psychiatric', 'mental health', 'emergency'], true, true),

-- SUBSTANCE ABUSE & RECOVERY
('Ohio Recovery Network', 'Addiction Recovery Support', 'Statewide network connecting individuals to treatment, recovery housing, and peer support services.', 'healthcare', 'Ohio Recovery Network', 'nonprofit', 'Ohio', 'OH', NULL, NULL, '1-877-275-6364', NULL, 'https://recoveryohio.gov', NULL, ARRAY['addiction', 'recovery', 'substance abuse', 'treatment'], true, true),

('Maryhaven', 'Addiction Treatment Services', 'Comprehensive addiction treatment including detox, residential treatment, outpatient services, and recovery housing in Central Ohio.', 'healthcare', 'Maryhaven', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-324-5425', NULL, 'https://maryhaven.com', '1791 Alum Creek Dr, Columbus, OH 43207', ARRAY['addiction', 'detox', 'treatment', 'recovery'], true, true),

-- FAMILY & CHILDREN SERVICES
('Ohio Department of Children and Youth', 'Child & Family Services', 'State agency overseeing child welfare, family support programs, and child protection services.', 'family', 'Ohio DCY', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '1-855-642-4453', NULL, 'https://jfs.ohio.gov/ocy', NULL, ARRAY['family', 'children', 'child welfare', 'family support'], true, true),

('Action for Children', 'Childcare & Family Resources', 'Connects families with quality childcare, parenting resources, and family support services throughout Central Ohio.', 'family', 'Action for Children', 'nonprofit', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-224-0222', NULL, 'https://actionforchildren.org', '78 Jefferson Ave, Columbus, OH 43215', ARRAY['childcare', 'parenting', 'family resources'], true, true),

-- EDUCATION & TRAINING
('Aspire Ohio', 'Adult Education Programs', 'Free adult education including GED preparation, literacy, and English language classes at locations throughout Ohio.', 'education', 'Ohio Department of Higher Education', 'government', 'Ohio', 'OH', NULL, NULL, NULL, NULL, 'https://aspire.ohio.gov', NULL, ARRAY['education', 'GED', 'adult education', 'literacy'], true, true),

('Columbus State Community College', 'Workforce Training Programs', 'Affordable career training and education programs including certificates and associate degrees. Financial aid available.', 'education', 'Columbus State', 'education', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-287-5353', NULL, 'https://cscc.edu', '550 E Spring St, Columbus, OH 43215', ARRAY['education', 'training', 'college', 'career'], true, true),

-- FINANCIAL ASSISTANCE
('Ohio Benefit Bank', 'Benefits Screening & Application', 'Free service helping Ohioans apply for food assistance, healthcare, utility assistance, and other public benefits.', 'financial', 'Ohio Association of Foodbanks', 'nonprofit', 'Ohio', 'OH', NULL, NULL, NULL, NULL, 'https://ohiobenefits.org', NULL, ARRAY['benefits', 'food assistance', 'healthcare', 'financial help'], true, true),

('HEAP Ohio', 'Utility Assistance Program', 'Home Energy Assistance Program helps eligible Ohioans pay heating and cooling bills. Apply through local community action agencies.', 'financial', 'Ohio Development Services Agency', 'government', 'Ohio', 'OH', NULL, NULL, '1-800-282-0880', NULL, 'https://energyhelp.ohio.gov', NULL, ARRAY['utility assistance', 'heating', 'cooling', 'energy bills'], true, true),

-- REENTRY SPECIFIC
('Ohio Department of Rehabilitation and Correction', 'Reentry Resources', 'Official state resources for individuals returning from incarceration including parole, programming, and community connections.', 'reentry', 'ODRC', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-752-1159', NULL, 'https://drc.ohio.gov/reentry', '770 W Broad St, Columbus, OH 43222', ARRAY['reentry', 'parole', 'returning citizens', 'ODRC'], true, true),

('Reentry Coalition of Cuyahoga County', 'Northeast Ohio Reentry Services', 'Coalition of organizations providing comprehensive reentry support in the Cleveland/Cuyahoga County area.', 'reentry', 'Reentry Coalition', 'nonprofit', 'Ohio', 'OH', 'Cleveland', 'Cuyahoga', '216-443-6580', NULL, 'https://reentrycoalition.org', NULL, ARRAY['reentry', 'Cleveland', 'Cuyahoga County', 'returning citizens'], true, true),

('Oriana House', 'Residential Reentry Programs', 'Community-based correctional facilities and reentry programs in Northeast Ohio including treatment, job training, and transitional housing.', 'reentry', 'Oriana House', 'nonprofit', 'Ohio', 'OH', 'Akron', 'Summit', '330-535-8116', NULL, 'https://orianahouse.org', '264 S Arlington St, Akron, OH 44306', ARRAY['reentry', 'residential', 'treatment', 'Akron'], true, true),

-- FOOD ASSISTANCE
('Mid-Ohio Food Collective', 'Food Bank Services', 'Largest hunger relief organization in Central Ohio. Operates food pantries and provides emergency food assistance.', 'food', 'Mid-Ohio Food Collective', 'nonprofit', 'Ohio', 'OH', 'Grove City', 'Franklin', '614-274-7770', NULL, 'https://midohiofoodcollective.org', '3960 Brookham Dr, Grove City, OH 43123', ARRAY['food', 'food bank', 'hunger relief', 'emergency food'], true, true),

('Greater Cleveland Food Bank', 'Northeast Ohio Food Assistance', 'Provides food to hunger relief programs throughout Northeast Ohio including food pantries and hot meal programs.', 'food', 'Greater Cleveland Food Bank', 'nonprofit', 'Ohio', 'OH', 'Cleveland', 'Cuyahoga', '216-738-2265', NULL, 'https://greaterclevelandfoodbank.org', '15500 S Waterloo Rd, Cleveland, OH 44110', ARRAY['food', 'food bank', 'Cleveland', 'hunger relief'], true, true),

-- TRANSPORTATION
('COTA', 'Central Ohio Public Transit', 'Public bus system serving Franklin County and surrounding areas. Reduced fare programs available for seniors, disabled, and low-income riders.', 'transportation', 'COTA', 'government', 'Ohio', 'OH', 'Columbus', 'Franklin', '614-228-1776', NULL, 'https://cota.com', NULL, ARRAY['transportation', 'bus', 'transit', 'Columbus'], true, true),

('RTA Cleveland', 'Greater Cleveland Transit', 'Public transit system serving Cuyahoga County including buses and rail. Discount programs available.', 'transportation', 'RTA', 'government', 'Ohio', 'OH', 'Cleveland', 'Cuyahoga', '216-621-9500', NULL, 'https://riderta.com', NULL, ARRAY['transportation', 'bus', 'rail', 'Cleveland'], true, true)

ON CONFLICT DO NOTHING;