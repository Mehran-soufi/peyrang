alter table public.authors
  add column if not exists nationality text,
  add column if not exists birth_year integer,
  add column if not exists death_year integer,
  add column if not exists homepage_position integer,
  add column if not exists homepage_book_count integer,
  add column if not exists homepage_image text;

do $$
declare
  author_seed record;
begin
  for author_seed in
    select * from (values
      ('fyodor-dostoevsky', 'فئودور داستایفسکی', 'روسیه', 1821, 1881, 1, 8, '/assets/images/authors/dostoevsky.webp'),
      ('leo-tolstoy', 'لئو تولستوی', 'روسیه', 1828, 1910, 2, 7, '/assets/images/authors/tolstoy.webp'),
      ('albert-camus', 'آلبر کامو', 'فرانسه', 1913, 1960, 3, 6, '/assets/images/authors/camus.webp'),
      ('franz-kafka', 'فرانتس کافکا', 'اتریش-مجارستان', 1883, 1924, 4, 5, '/assets/images/authors/kafka.webp'),
      ('george-orwell', 'جورج اورول', 'بریتانیا', 1903, 1950, 5, 5, '/assets/images/authors/orwell.webp'),
      ('gabriel-garcia-marquez', 'گابریل گارسیا مارکز', 'کلمبیا', 1927, 2014, 6, 6, '/assets/images/authors/marquez.webp'),
      ('sadegh-hedayat', 'صادق هدایت', 'ایران', 1281, 1330, 7, 7, '/assets/images/authors/sadegh-hedayat.webp'),
      ('mahmoud-dowlatabadi', 'محمود دولت‌آبادی', 'ایران', 1319, null, 8, 5, '/assets/images/authors/dowlatabadi.webp'),
      ('hooshang-golshiri', 'هوشنگ گلشیری', 'ایران', 1316, 1379, 9, 4, '/assets/images/authors/golshiri.webp'),
      ('simin-daneshvar', 'سیمین دانشور', 'ایران', 1300, 1390, 10, 4, '/assets/images/authors/simin-daneshvar.webp')
    ) as featured(slug, name, nationality, birth_year, death_year, homepage_position, homepage_book_count, homepage_image)
  loop
    update public.authors
    set name = author_seed.name,
        nationality = author_seed.nationality,
        birth_year = author_seed.birth_year,
        death_year = author_seed.death_year,
        homepage_position = author_seed.homepage_position,
        homepage_book_count = author_seed.homepage_book_count,
        homepage_image = author_seed.homepage_image
    where slug = author_seed.slug;

    if not found then
      insert into public.authors (
        slug,
        name,
        nationality,
        birth_year,
        death_year,
        homepage_position,
        homepage_book_count,
        homepage_image
      ) values (
        author_seed.slug,
        author_seed.name,
        author_seed.nationality,
        author_seed.birth_year,
        author_seed.death_year,
        author_seed.homepage_position,
        author_seed.homepage_book_count,
        author_seed.homepage_image
      );
    end if;
  end loop;
end;
$$;

update public.authors
set bio = coalesce(
  nullif(btrim(bio), ''),
  'نویسنده و طنزپرداز ایرانی؛ رمان «دایی‌جان ناپلئون» شناخته‌شده‌ترین اثر اوست.'
)
where slug = 'iraj-pezeshkzad';
