# الدرس العاشر: بناء قواعد البيانات والجداول وتحديد القيود الحقلية (DDL)

![جداول البيانات](/images/concept_arrays.png)

## لغة تعريف البيانات (DDL - Data Definition Language)
هي جزء من لغة SQL يُستخدم لبناء، وتعديل، وتدمير الهياكل الأساسية في قاعدة البيانات (مثل القواعد، الجداول، والقيود) بدلاً من البيانات نفسها.

## 1. إنشاء قاعدة بيانات جديدة (`CREATE DATABASE`)
هذه هي الخطوة التأسيسية لبناء النظام.
```sql
CREATE DATABASE IF NOT EXISTS university_db CHARACTER SET utf8mb4;
```
- `IF NOT EXISTS`: لمنع حدوث خطأ إذا كانت القاعدة موجودة مسبقاً.
- `CHARACTER SET utf8mb4`: لضمان دعم وتخزين الحروف باللغة العربية بشكل سليم دون تشويه.

**لتنشيط القاعدة والعمل عليها:**
```sql
USE university_db;
```

## 2. إنشاء جدول جديد (`CREATE TABLE`)
لبناء الجداول وتحديد الأعمدة والأنواع والقيود.
```sql
CREATE TABLE IF NOT EXISTS students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(dept_id)
);
```

### أنواع البيانات (Data Types):
تُحدد حجم ونوع البيانات لكل عمود:
- **`INT`**: الأرقام الصحيحة.
- **`FLOAT` / `DOUBLE`**: الأرقام العشرية.
- **`VARCHAR(length)`**: نصوص قصيرة إلى متوسطة، مع تحديد أقصى طول.
- **`TEXT`**: نصوص طويلة جداً (كالمقالات).
- **`DATE`**: تواريخ (YYYY-MM-DD).

## 3. التعديل في بنية الجدول (`ALTER TABLE`)
لتوسيع أو تغيير بنيان الجداول القائمة دون مسح البيانات.
- **إضافة حقل جديد:**
```sql
ALTER TABLE students ADD student_phone VARCHAR(15);
```
- **تحديد موقع الحقل (بجوار حقل معين):**
```sql
ALTER TABLE students ADD student_email VARCHAR(100) AFTER student_name;
```
- **تعديل حقل موجود:**
```sql
ALTER TABLE students MODIFY student_name VARCHAR(150) NOT NULL;
```

## 4. إسقاط الكائنات (الحذف النهائي `DROP`)
الأداة الإدارية القصوى لإزالة الهياكل من الجذور.
- **إسقاط قاعدة بيانات:** `DROP DATABASE IF EXISTS university_db;`
- **إسقاط جدول:** `DROP TABLE IF EXISTS students;`

## 5. عرض واستكشاف الهياكل (`SHOW` / `DESCRIBE`)
- **لعرض كافة قواعد البيانات بالسيرفر:** `SHOW DATABASES;`
- **لعرض جداول القاعدة النشطة:** `SHOW TABLES;`
- **لعرض تفاصيل وهيكل جدول معين:** `DESCRIBE students;` (أو `DESC students;`)

## 6. القيود البرمجية (Constraints)
لضمان دقة وصحة البيانات المدخلة:
1. **المفتاح الأساسي (`PRIMARY KEY`):** لضمان فرادة السجل وعدم تكرار أو فراغ الحقل.
2. **الزيادة التلقائية (`AUTO_INCREMENT`):** توليد أرقام متسلسلة للـ ID بدون تدخل المبرمج.
3. **المفتاح الأجنبي (`FOREIGN KEY`):** لربط الجداول وتفعيل خاصية "التكامل المرجعي" (لا يُمكن إضافة طالب في قسم غير موجود).
4. **القيمة الافتراضية (`DEFAULT`):** ملء الحقل بقيمة جاهزة إذا تركها المستخدم فارغة. (مثل: `DEFAULT 'Active'`).
5. **قيد الفحص (`CHECK`):** لفرض شروط رقمية أو منطقية (مثل التأكد أن الدرجة بين 0 و 100).
6. **قيد الفرادة (`UNIQUE`):** منع تكرار القيمة في أي حقل لا يُعد مفتاحاً أساسياً (مثل البريد الإلكتروني).
7. **إلزامي (`NOT NULL`):** يمنع ترك الحقل فارغاً.
