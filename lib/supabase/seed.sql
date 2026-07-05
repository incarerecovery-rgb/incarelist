-- InCareList.com seed data
-- Run after schema.sql. Seeds all 50 states + DC, all 17 categories, and
-- one sample provider per category (matching lib/mock-data.ts) so the
-- claim, approve, edit loop is testable against a real database.
--
-- Each provider is its own standalone INSERT statement (rather than one
-- big multi-row INSERT...SELECT...FROM (VALUES...) block) on purpose: if
-- any single row ever has a problem, Postgres points at that one
-- statement specifically instead of failing the entire seed file at once.

insert into states (name, slug) values
  ('Alabama', 'alabama'), ('Alaska', 'alaska'), ('Arizona', 'arizona'),
  ('Arkansas', 'arkansas'), ('California', 'california'), ('Colorado', 'colorado'),
  ('Connecticut', 'connecticut'), ('Delaware', 'delaware'),
  ('District of Columbia', 'district-of-columbia'), ('Florida', 'florida'),
  ('Georgia', 'georgia'), ('Hawaii', 'hawaii'), ('Idaho', 'idaho'),
  ('Illinois', 'illinois'), ('Indiana', 'indiana'), ('Iowa', 'iowa'),
  ('Kansas', 'kansas'), ('Kentucky', 'kentucky'), ('Louisiana', 'louisiana'),
  ('Maine', 'maine'), ('Maryland', 'maryland'), ('Massachusetts', 'massachusetts'),
  ('Michigan', 'michigan'), ('Minnesota', 'minnesota'), ('Mississippi', 'mississippi'),
  ('Missouri', 'missouri'), ('Montana', 'montana'), ('Nebraska', 'nebraska'),
  ('Nevada', 'nevada'), ('New Hampshire', 'new-hampshire'), ('New Jersey', 'new-jersey'),
  ('New Mexico', 'new-mexico'), ('New York', 'new-york'), ('North Carolina', 'north-carolina'),
  ('North Dakota', 'north-dakota'), ('Ohio', 'ohio'), ('Oklahoma', 'oklahoma'),
  ('Oregon', 'oregon'), ('Pennsylvania', 'pennsylvania'), ('Rhode Island', 'rhode-island'),
  ('South Carolina', 'south-carolina'), ('South Dakota', 'south-dakota'),
  ('Tennessee', 'tennessee'), ('Texas', 'texas'), ('Utah', 'utah'),
  ('Vermont', 'vermont'), ('Virginia', 'virginia'), ('Washington', 'washington'),
  ('West Virginia', 'west-virginia'), ('Wisconsin', 'wisconsin'), ('Wyoming', 'wyoming')
on conflict (slug) do nothing;

insert into categories (name, slug) values ('Therapists', 'therapists') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Psychologists', 'psychologists') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Psychiatrists', 'psychiatrists') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Mental Health Clinics', 'mental-health-clinics') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Substance Use Treatment Centers', 'substance-use-treatment-centers') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Detox Centers', 'detox-centers') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Sober Living Homes', 'sober-living-homes') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Intensive Outpatient Programs (IOP)', 'intensive-outpatient-programs') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Partial Hospitalization Programs (PHP)', 'partial-hospitalization-programs') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Residential Treatment Centers', 'residential-treatment-centers') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Assisted Living Facilities', 'assisted-living-facilities') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Memory Care Communities', 'memory-care-communities') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Independent Senior Living', 'independent-senior-living') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Skilled Nursing Facilities', 'skilled-nursing-facilities') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Hospice Providers', 'hospice-providers') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Home Health Agencies', 'home-health-agencies') on conflict (slug) do nothing;
insert into categories (name, slug) values ('Case Management Services', 'case-management-services') on conflict (slug) do nothing;

-- One sample provider per category, mirrors lib/mock-data.ts exactly, so
-- the site looks the same whether or not Supabase is connected. Each is a
-- standalone statement, safe to run more than once (on conflict do nothing).

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Clearmind Therapy Partners', 'clearmind-therapy-partners',
  (select id from states where slug = 'california'), (select id from categories where slug = 'therapists'),
  '4200 Ocean Terrace Blvd', '90045', '(310) 555-0142', 'https://example.com',
  'A group therapy practice offering individual and couples counseling for anxiety, depression, and life transitions, with evening and weekend availability.',
  array['Individual Therapy','Couples Counseling','Telehealth Sessions','Sliding Scale Intake'],
  array['Private Insurance','Self-Pay','Sliding Scale'], 'Mon-Fri 8am-8pm, Sat 9am-2pm', true,
  'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Riverstone Psychological Associates', 'riverstone-psychological-associates',
  (select id from states where slug = 'texas'), (select id from categories where slug = 'psychologists'),
  '118 Bay Vista Ave', '78701', '(512) 555-0198', 'https://example.com',
  'Licensed clinical psychologists providing diagnostic testing, psychological evaluation, and evidence-based therapy for adults and adolescents.',
  array['Psychological Testing','ADHD Evaluation','CBT','Adolescent Therapy'],
  array['Private Insurance','Medicaid'], 'Mon-Thu 9am-6pm', true,
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80', true, false, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Harborview Psychiatric Group', 'harborview-psychiatric-group',
  (select id from states where slug = 'new-york'), (select id from categories where slug = 'psychiatrists'),
  '560 Presidio View St', '10029', '(212) 555-0187', 'https://example.com',
  'Board-certified psychiatrists offering medication management and psychiatric evaluation for mood, anxiety, and thought disorders, in-person and via telehealth.',
  array['Medication Management','Psychiatric Evaluation','Telepsychiatry'],
  array['Private Insurance','Medicare','Medicaid'], 'Mon-Fri 8am-5pm', true,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Golden Gate Mental Wellness Clinic', 'golden-gate-mental-wellness',
  (select id from states where slug = 'california'), (select id from categories where slug = 'mental-health-clinics'),
  '902 Willow Creek Rd', '94129', '(415) 555-0176', 'https://example.com',
  'Outpatient mental health clinic offering individual therapy, psychiatric care, and group programs for anxiety, depression, and trauma under one roof.',
  array['Individual Therapy','Group Programs','Psychiatric Care','Crisis Support'],
  array['Private Insurance','Medicaid','Medicare'], 'Mon-Fri 7am-7pm', true,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Clearwater Recovery Center', 'clearwater-recovery-center',
  (select id from states where slug = 'florida'), (select id from categories where slug = 'substance-use-treatment-centers'),
  '77 Fieldstone Dr', '33755', '(727) 555-0133', null,
  'A flexible outpatient and residential program offering individualized treatment plans for substance use and co-occurring mental health conditions.',
  array['Residential Treatment','Outpatient Program','Dual Diagnosis Care'],
  array['Medicaid','Private Insurance'], null, false,
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80', false, false, false, false, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Riverbend Detox Clinic', 'riverbend-detox-clinic',
  (select id from states where slug = 'ohio'), (select id from categories where slug = 'detox-centers'),
  '56 Mill Run Ct', '43215', '(614) 555-0154', 'https://example.com',
  '24/7 medically monitored detox with direct transition support into residential or outpatient programs.',
  array['Medical Detox','24/7 Monitoring','Transition Planning'],
  array['Medicaid','Medicare','Private Insurance'], 'Open 24/7', true,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', true, false, true, false, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Sunridge Sober Living', 'sunridge-sober-living',
  (select id from states where slug = 'arizona'), (select id from categories where slug = 'sober-living-homes'),
  '3300 Desert Bloom Way', '85251', '(480) 555-0111', 'https://example.com',
  'A structured, gender-specific sober living home with peer accountability, house meetings, and coordination with local outpatient providers.',
  array['Structured Housing','Peer Support Meetings','Curfew & Accountability','Outpatient Coordination'],
  array['Self-Pay'], 'Office hours Mon-Fri 9am-5pm', true,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Brightpath IOP Services', 'brightpath-iop-services',
  (select id from states where slug = 'illinois'), (select id from categories where slug = 'intensive-outpatient-programs'),
  '214 Orchard Grove Ln', '60614', '(312) 555-0122', null,
  'Evening intensive outpatient programming for substance use and mental health, designed for clients balancing work, school, or family commitments.',
  array['Evening IOP Sessions','Family Therapy','Relapse Prevention Planning'],
  array['Medicaid','Sliding Scale'], null, false,
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80', false, false, false, false, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Meridian Partial Hospitalization Center', 'meridian-php-center',
  (select id from states where slug = 'massachusetts'), (select id from categories where slug = 'partial-hospitalization-programs'),
  '88 Beacon Hollow Rd', '02116', '(617) 555-0165', 'https://example.com',
  'A structured day-treatment program bridging inpatient and outpatient care for individuals stepping down from a psychiatric hospitalization or crisis stay.',
  array['Day Treatment','Psychiatric Step-Down Care','Group & Individual Sessions'],
  array['Private Insurance','Medicare'], 'Mon-Fri 8am-3pm', true,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', true, false, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Riverpark Residential Treatment Center', 'riverpark-residential-treatment',
  (select id from states where slug = 'colorado'), (select id from categories where slug = 'residential-treatment-centers'),
  '902 Willow Creek Rd', '80202', '(303) 555-0176', 'https://example.com',
  'Specializes in adolescent and adult residential treatment, combining clinical care with family therapy and structured daily programming.',
  array['24/7 Residential Care','Family Therapy','Academic Support','Individualized Treatment Plans'],
  array['Private Insurance','Self-Pay'], null, true,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Willow Creek Assisted Living', 'willow-creek-assisted-living',
  (select id from states where slug = 'north-carolina'), (select id from categories where slug = 'assisted-living-facilities'),
  '410 Magnolia Court', '27601', '(919) 555-0140', 'https://example.com',
  'A warm, community-centered assisted living residence offering personal care support, daily activities, and restaurant-style dining.',
  array['Personal Care Assistance','Medication Management','Daily Activities','Restaurant-Style Dining'],
  array['Private Insurance','Long-Term Care Insurance','Self-Pay'], 'Tours by appointment, 7 days a week', true,
  'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Harborlight Memory Care Community', 'harborlight-memory-care',
  (select id from states where slug = 'washington'), (select id from categories where slug = 'memory-care-communities'),
  '77 Fieldstone Dr', '98101', '(206) 555-0133', null,
  'A secure, purpose-built memory care community for individuals with dementia and related conditions, with a dedicated specialized-care staff ratio.',
  array['Secure Memory Care Neighborhood','Specialized Dementia Programming','24/7 Nursing Support'],
  array['Long-Term Care Insurance','Self-Pay'], null, false,
  'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=1200&q=80', false, false, false, false, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Cedar Grove Independent Living', 'cedar-grove-independent-living',
  (select id from states where slug = 'oregon'), (select id from categories where slug = 'independent-senior-living'),
  '3300 Desert Bloom Way', '97201', '(503) 555-0111', 'https://example.com',
  'An active-adult independent living community with private apartments, on-site fitness and wellness programs, and a full activities calendar.',
  array['Private Apartments','Fitness & Wellness Center','Social & Activities Calendar','Housekeeping'],
  array['Self-Pay'], 'Leasing office Mon-Sat 9am-5pm', true,
  'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=1200&q=80', true, false, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Pinehaven Skilled Nursing Facility', 'pinehaven-skilled-nursing',
  (select id from states where slug = 'michigan'), (select id from categories where slug = 'skilled-nursing-facilities'),
  '214 Orchard Grove Ln', '48226', '(313) 555-0122', 'https://example.com',
  '24-hour skilled nursing care with on-site physical, occupational, and speech therapy for short-term rehabilitation and long-term residents.',
  array['24-Hour Skilled Nursing','Physical Therapy','Occupational Therapy','Short-Term Rehab'],
  array['Medicare','Medicaid','Private Insurance'], null, true,
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Gentle Path Hospice', 'gentle-path-hospice',
  (select id from states where slug = 'tennessee'), (select id from categories where slug = 'hospice-providers'),
  '560 Presidio View St', '37203', '(615) 555-0187', null,
  'Compassionate end-of-life hospice care delivered at home, in facilities, or in our inpatient unit, with 24/7 nurse support for patients and families.',
  array['In-Home Hospice Care','Inpatient Hospice Unit','24/7 Nurse Support','Grief & Bereavement Counseling'],
  array['Medicare','Medicaid','Private Insurance'], null, false,
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80', false, false, false, false, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'TrueHeart Home Health Agency', 'trueheart-home-health',
  (select id from states where slug = 'georgia'), (select id from categories where slug = 'home-health-agencies'),
  '902 Willow Creek Rd', '30303', '(404) 555-0176', 'https://example.com',
  'Licensed home health agency providing skilled nursing, physical therapy, and personal care visits for patients recovering or aging in place at home.',
  array['Skilled Nursing Visits','Physical Therapy at Home','Personal Care Aides','Medication Reminders'],
  array['Medicare','Medicaid','Private Insurance'], 'On-call 24/7, office Mon-Fri 8am-6pm', true,
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80', true, true, true, true, 'seed'
) on conflict (slug) do nothing;

insert into providers (name, slug, state_id, category_id, address, zip, phone, website, description, services_offered, insurance_accepted, hours_of_operation, contact_form_enabled, image_url, verified, featured, claimed, is_premium, source)
values (
  'Compass Case Management Services', 'compass-case-management-services',
  (select id from states where slug = 'pennsylvania'), (select id from categories where slug = 'case-management-services'),
  '118 Bay Vista Ave', '19102', '(215) 555-0198', null,
  'Independent case managers who coordinate care plans, benefits navigation, and provider referrals for individuals managing complex medical or behavioral health needs.',
  array['Care Plan Coordination','Benefits Navigation','Provider Referrals','Family Consultation'],
  array['Private Insurance','Self-Pay'], null, false,
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80', false, false, false, false, 'seed'
) on conflict (slug) do nothing;

-- Contact-form delivery emails for the Premium seeded providers (matches
-- lib/mock-data.ts). Each is its own statement for the same reason as above.

update providers set contact_form_enabled = true, contact_email = 'hello@clearmindtherapy.example.com' where slug = 'clearmind-therapy-partners';
update providers set contact_form_enabled = true, contact_email = 'intake@riverstonepsych.example.com' where slug = 'riverstone-psychological-associates';
update providers set contact_form_enabled = true, contact_email = 'contact@harborviewpsych.example.com' where slug = 'harborview-psychiatric-group';
update providers set contact_form_enabled = true, contact_email = 'hello@ggmentalwellness.example.com' where slug = 'golden-gate-mental-wellness';
update providers set contact_form_enabled = true, contact_email = 'admissions@sunridgesober.example.com' where slug = 'sunridge-sober-living';
update providers set contact_form_enabled = true, contact_email = 'intake@meridianphp.example.com' where slug = 'meridian-php-center';
update providers set contact_form_enabled = true, contact_email = 'admissions@riverparktreatment.example.com' where slug = 'riverpark-residential-treatment';
update providers set contact_form_enabled = true, contact_email = 'tours@willowcreekliving.example.com' where slug = 'willow-creek-assisted-living';
update providers set contact_form_enabled = true, contact_email = 'leasing@cedargroveliving.example.com' where slug = 'cedar-grove-independent-living';
update providers set contact_form_enabled = true, contact_email = 'admissions@pinehavensnf.example.com' where slug = 'pinehaven-skilled-nursing';
update providers set contact_form_enabled = true, contact_email = 'referrals@truehearthh.example.com' where slug = 'trueheart-home-health';
