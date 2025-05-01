# Akademik Personel Başvuru Sistemi

## Proje Tanıtımı
 Bu proje , Akademik personel başvuru sürecini dijital ortamda yönetmeyi amaçlayan bu sistem, akademik kadro ilanları oluşturma, başvuru yapma, jüri değerlendirmeleri ve başvuru sonuçlarının yönetilmesini sağlar.

## Proje Amacı

Bu projenin amacı, akademik personel alım süreçlerini dijitalleştirerek, başvuru, değerlendirme ve sonuç süreçlerini verimli, şeffaf ve düzenli bir şekilde yönetebilecek bir sistem tasarlamaktır.

## Kullanıcı Rolleri

Sistem, dört temel kullanıcı rolüne sahiptir:

- **Aday:** Akademik kadrolara başvuru yapabilen kullanıcılar.
- **Admin:** İlanları oluşturan ve düzenleyen kullanıcılar.
- **Yönetici:** Başvuru kriterlerini belirleyen ve sistemin genel kurallarını yöneten kullanıcılar.
- **Jüri Üyesi:** Adayların başvuru belgelerini inceleyen ve değerlendirme raporu oluşturan kullanıcılar.

## Sistem Bileşenleri

### Aday Girişi ve Başvuru Süreci

1. Adaylar, TC kimlik numarası ve şifre ile sisteme giriş yapar.
2. Ana sayfada mevcut akademik ilanlar listelenir.
3. İlanlar Dr. Öğr. Üyesi, Doçent ve Profesör olmak üzere üç kategoriye ayrılır.
4. Adaylar, ilan detaylarını görüntüleyerek başvuru sürecini başlatır.
5. Başvuru için gerekli belgeler yüklenerek başvuru tamamlanır.
6. Başvuru durumu "Beklemede", "Onaylandı" veya "Reddedildi" olarak takip edilebilir.

### Admin Paneli

1. Adminler, giriş yaptıktan sonra ilan yönetim paneline erişir.
2. Yeni ilan ekleyebilir veya mevcut ilanları düzenleyebilir.
3. İlanların başlangıç ve bitiş tarihleri, gerekli belgeler ve başvuru koşulları belirlenebilir.

### Yönetici Paneli

1. Yöneticiler, giriş yaptıktan sonra akademik kadro kriterlerini belirleme yetkisine sahiptir.
2. KOÜ Atama Yönetmeliği'ne göre her bir akademik kadro için gerekli koşullar detaylı olarak girilebilir.
3. Adayların sunduğu belgeler ve puanlar otomatik hesaplanır.
   
<img width="761" alt="project-image-2" src="https://github.com/user-attachments/assets/7f0d335e-6215-4fd9-a7b8-4c47865c1228" />


Şekil-1 Yöneticilerin kriterleri görüntüleyip düzenleyebilme yetkisi bulunmaktadır.

### Jüri Üyesi Paneli

1. Jüri üyeleri, adayın başvuru sırasında yüklediği kanıtlı belgeleri inceleyebilir.
2. Jüri üyeleri, her başvuru için kendi kişisel değerlendirme raporlarını oluşturmalıdır.
3. Her jüri üyesi, olumlu/olumsuz değerlendirme yapmalıdır.

## Kullanılan Teknolojiler

- **Frontend:** React.js / Vue.js
- **Backend:** Node.js (Express) veya Django
- **Veritabanı:** PostgreSQL / MongoDB

## Fonksiyonel Gereksinimler
<img width="397" alt="project-image-1" src="https://github.com/user-attachments/assets/3e7a3543-589c-4c61-b97e-e4bbe2f29656" />


Şekil-2 Tüm kullanıcılar için ayrı giriş ekranları

- Kullanıcı girişi ve yetkilendi 
rme.
- Personel Daire Başkanlığı tarafından ilan oluşturulması.
- Adayların başvuru yapması ve belgeleri yüklemesi.
- Jüri üyelerinin değerlendirme yapması.
- Otomatik puan hesaplama modu.
- E-posta ve sistem içi bildirim entegrasyonu.
- PDF formatında belge oluşturma.
- Nüfus Müdürlüğü ve e-Devlet API entegrasyonu.

## Modüler Kadro Kriterleri

Her bir akademik kadro için (Dr. Öğr. Üyesi, Doçent, Profesör) etkinlik ve puan bazında kriterler belirlenmiştir. Bu kriterler modüler yapıda olmalı ve ilerleyen zamanlarda yapılacak değişikliklere uyum sağlayacak şekilde tasarlanmalıdır.

## Sistem İşleyişi

1. Admin yeni bir akademik ilan ekler.
2. Yönetici ilan için başvuru kriterlerini belirler.
3. Aday ilanı görüntüler ve başvuru yapar.
4. Sistem, adayın başvuruyu tamamlayıp tamamlamadığını kontrol eder.
5. Yönetici ilan kriterlerinde değişiklik yapabilir.
6. Başvuru süresi tamamlandığında yönetici başvuru sayısı hakkında bilgilendirilir.
7. Jüri üyeleri belirlenir ve değerlendirmelerini yaparak raporlarını sisteme yükler.
8. Tüm jüri üyelerinin değerlendirmeleri tamamlandıktan sonra yönetici nihai kararı verir.

## Sonuç
Bu proje, akademik personel başvurularını etkin şekilde yöneten bir sistem tasarımını içermektedir. Kullanıcı dostu arayüzü, ilan yönetimi, başvuru kriterleri belirleme, jüri değerlendirme süreci ve aday takibi gibi fonksiyonlarla akademik kadro alım süreçlerinin şeffaf ve düzenli bir şekilde yürütülmesine katkı sağlayacaktır.

## Proje Raporu
-
[Grup25_ProjeRaporu  (1).odt](https://github.com/user-attachments/files/20002393/Grup25_ProjeRaporu.1.odt)
