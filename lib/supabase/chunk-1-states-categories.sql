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
