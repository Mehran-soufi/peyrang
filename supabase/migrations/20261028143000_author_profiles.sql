update public.authors as authors
set bio = coalesce(
      nullif(btrim(authors.bio), ''),
      profiles.bio
    ),
    nationality = coalesce(nullif(btrim(authors.nationality), ''), profiles.nationality),
    birth_year = coalesce(authors.birth_year, profiles.birth_year),
    death_year = coalesce(authors.death_year, profiles.death_year)
from (values
  (
    'iraj-pezeshkzad',
    'ایران',
    1306,
    1400,
    'نویسنده و طنزپرداز ایرانی که با رمان «دایی‌جان ناپلئون» شناخته می‌شود؛ این اثر از رمان‌های شاخص ادبیات معاصر فارسی است.'
  ),
  (
    'bozorg-alavi',
    'ایران',
    1282,
    1375,
    'نویسنده و مترجم ایرانی و از چهره‌های مهم داستان‌نویسی نوین فارسی؛ رمان «چشم‌هایش» از شناخته‌شده‌ترین آثار اوست.'
  ),
  (
    'zoya-pirzad',
    'ایران (ایرانی-ارمنی)',
    1331,
    null,
    'نویسندهٔ ایرانی-ارمنیِ داستان و رمان؛ آثار او از زندگی روزمره و روابط خانوادگی می‌گویند و «چراغ‌ها را من خاموش می‌کنم» از رمان‌های شناخته‌شدهٔ اوست.'
  ),
  (
    'paulo-coelho',
    'برزیل',
    1947,
    null,
    'رمان‌نویس برزیلی و نویسندهٔ «کیمیاگر»؛ آثار او در کشورهای زیادی منتشر و به زبان‌های گوناگون ترجمه شده‌اند.'
  ),
  (
    'abbas-maroufi',
    'ایران',
    1336,
    1401,
    'نویسنده، روزنامه‌نگار و نمایشنامه‌نویس ایرانی؛ رمان «سمفونی مردگان» از مهم‌ترین آثار اوست.'
  )
) as profiles(slug, nationality, birth_year, death_year, bio)
where authors.slug = profiles.slug;
