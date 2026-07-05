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
