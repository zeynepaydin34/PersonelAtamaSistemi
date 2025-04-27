# PersonelAtamaSistemi
Kocaeli Üniversiteis Akademik Personel Atama Sistemi

## Kullanılan Teknolojiler
Frontend: React.js 

Backend: Node.js (Express.js)

Veritabanı: PostgreSQL

## Proje Amacı
Akademik personel başvuru süreçlerini dijitalleştirerek:

Başvuruların güvenli ve hızlı bir şekilde toplanması,

Belgelerin doğru yönetilmesi,

Değerlendirme süreçlerinin şeffaflaştırılması hedeflenmiştir.

## Kullanıcı Rolleri
Sistem dört temel kullanıcı rolüne sahiptir:

Aday:
Akademik kadrolara başvuru yapabilen kullanıcılar.

Admin:
İlanları oluşturan, düzenleyen ve yöneten kullanıcılar.

Yönetici:
Başvuru kriterlerini belirleyen ve sistem genel ayarlarını yöneten kullanıcılar.

Jüri Üyesi:
Adayların başvuru belgelerini inceleyen ve değerlendirme raporu oluşturan kullanıcılar.

## Temel Özellikler
📄 Aday Başvuru Sistemi:
Adaylar sisteme giriş yaparak ilanlara belgelerini yükleyip başvuru yapabilir.

📢 İlan Yönetimi:
Admin kullanıcıları yeni ilanlar ekleyebilir, mevcut ilanları düzenleyebilir veya silebilir.

📑 Başvuru Kriterleri Belirleme:
Yöneticiler, her ilan için ayrı kriterler tanımlayabilir.

📝 Belgelerin İncelenmesi ve Değerlendirilmesi:
Jüri üyeleri, adayların yüklediği belgeleri değerlendirerek puanlama ve raporlama yapabilir.

🔐 Güvenli Giriş ve Yetkilendirme:
Tüm kullanıcı rolleri JWT tabanlı kimlik doğrulama ile korunmaktadır.

🖇️ Dosya Yönetimi:
Yüklenen dosyalar güvenli bir şekilde sunucu üzerinde saklanır, dosya türü ve boyut kontrolleri yapılır.

