# NTCInterview
## Akış ve beklenen özellikler
- Uygulama tek sayfadan oluşuyor (menü öğelerinin herhangi bir fonksiyonu olmasına gerek yok).
- Kullanıcı "Ay" ve "Yıl" input değerlerini doldurur,
- "Sorgula" butonuna tıklar/dokunur;
  - Servisten alınan veri ekranda gösterilir.
- "PDF oluştur" butonuna tıklar/dokunur;
  - Servisten alınan veri (base64) PDF olarak ekranda gösterilir.

### Notlar
- Sayfa açıldığında "Ay" değeri güncel ay olmalı (eğer anlık tarih, ayın 10. gününden önce ise bir önceki ay olmalı).  
  (Kullanıcı uygulamayı 09.08.2022 tarihinde kullanıyorsa "Ay" değeri Temmuz, 10.08.2022 tarihinde kullanıyorsa "Ay" değeri Ağustos olmalı).
- Kullanıcı "Ay" ve "Yıl" değerlerini değiştirebilmeli, gelecek tarihli (yukarıdaki kural da göz önünde bulundurularak) seçim yapamamalı.
- Yıl alanından geriye dönük 5 yıllık değerler olmalı.
- Açıklama alanı 100 karakter ile sınırlandırılmalı (sonrasında '...' konmalı).
- Geliştirmelerde UIKit (aşağıda paylaşılmış olan) kullanılmalı.
- Servis bağlantıları için ⬢**ecra**Api (aşağıda paylaşılmış olan) kullanılmalı.

## Kaynaklar
- [UIKit](https://drive.google.com/open?id=10EnUneryzm4ndofcff9dWYwdE4j4UIWX)
- [⬢**ecra**Api](https://documenter.getpostman.com/view/1753559/VUjTkiYF)
  - `access_token` almak için aşağıdaki değerler kullanılabilir;  
    - client_id  
    LBeaBDGCihxbvSCChIQOOLDLmTNGgDMl
    - client_secret  
    FsYwzDRLkXcFrvfaTTyDCscdIQBYrKxgjjIIUNuViZAHaYdr
    - scope  
    service
- [UI tasarım](https://drive.google.com/open?id=10FAemfBovxOs00MQCkwAUYXwEgwjAUyN) (kaynak dosyalar ve önizleme)
  