# الدرس الثاني عشر: استعلامات قواعد البيانات وجلب التقارير (DQL - Data Query Language)

## 1. استرجاع البيانات المخزنة من الجداول باستخدام جملة الاستعلام (`SELECT`)
تُعد هذه المهارة حجر الأساس والقوة المحركة لـ لغة الاستعلام عن البيانات (DQL)، حيث يتمثل دورها الوظيفي في قراءة وسحب البيانات الرقمية والنصية المحفوظة مسبقاً داخل مستودعات الجداول لعرضها على شاشة المستخدم دون التعديل على الأصل أو المساس بالبنية التحتية للقواعد.

### استعلام شامل للجدول:
```sql
SELECT * FROM students;
```

### تحديد أعمدة معينة للبحث:
لتجنب سحب بيانات زائدة وتحسين سرعة النظام.
```sql
SELECT student_phone, student_name FROM students;
```

## 2. تصفية نتائج الاستعلام باستخدام الجملة الشرطية (`WHERE`)
لاستخلاص الصفوف التي تنطبق عليها شروط ومعايير معينة فقط.
```sql
SELECT * FROM students WHERE student_id = 1;
```

## 3. دمج مخرجات حقلين نصيين في عمود واحد مسترجع باستخدام دالة الدمج (`CONCAT`)
```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM students;
```

## 4. تسمية الحقول المسترجعة بأسماء مستعارة (`AS` / `Alias`)
لمنح الأعمدة أو الجداول أسماءً بديلة ومؤقتة تظهر فقط في شاشة النتائج وتسهل قراءة التقارير، دون تغيير الاسم الفعلي في قاعدة البيانات.
```sql
SELECT student_name AS Student_Full_Name FROM students;
```

## 5. ترتيب سجلات النتائج (`ORDER BY`) وتحديد عدد الصفوف (`LIMIT`)
- **`ORDER BY`**: لإعادة الترتيب تصاعدياً `ASC` أو تنازلياً `DESC`.
- **`LIMIT`**: لحصر وتقييد عدد السجلات المعروضة على الشاشة.
```sql
SELECT student_name, grade_score FROM student_grades ORDER BY grade_score DESC LIMIT 3;
```

## 6. استخراج قيمة تبدأ أو تنتهي بحرف معين باستخدام المعامل (`LIKE`)
- البحث عن اسم يبدأ بحرف 'أ': `LIKE 'أ%'`
- البحث عن نص ينتهي بحرف 'م': `LIKE '%م'`
- البحث عن نص يحتوي على الحرف في أي مكان: `LIKE '%ع%'`
```sql
SELECT * FROM students WHERE student_name LIKE '%م%';
```

## 7. توظيف الدوال التجميعية (Aggregate Functions)
- **`SUM`**: حساب المجموع الإجمالي. `SELECT SUM(payment_amount) FROM payments;`
- **`COUNT`**: عد السجلات. `SELECT COUNT(student_id) FROM students;`
- **`AVG`**: المتوسط الحسابي. `SELECT AVG(exam_score) FROM exams;`
- **`MAX`**: استخراج أعلى قيمة. `SELECT MAX(total_marks) FROM results;`
- **`MIN`**: استخراج أقل قيمة. `SELECT MIN(total_marks) FROM results;`

## 8. تجميع السجلات (`GROUP BY`) وتصفية المجموعات الإحصائية (`HAVING`)
- **`GROUP BY`**: لدمج السجلات المتشابهة داخل حزم أو مجموعات وبناء التقارير الإحصائية الفئوية.
- **`HAVING`**: لفرض شروط صارمة على المجموعات الفرعية الناتجة من عملية التجميع (بديل لـ `WHERE` عند استخدام دوال التجميع).
```sql
SELECT department, COUNT(student_id) 
FROM students 
GROUP BY department 
HAVING COUNT(student_id) > 5;
```

## 9. ربط بين عدة جداول برمجياً لاسترجاع بيانات متكاملة (`JOINS`)
- **`INNER JOIN`**: يستخرج السجلات المطابقة تماماً في كلا الجدولين.
```sql
SELECT students.student_name, sections.section_name 
FROM students 
INNER JOIN sections ON students.section_id = sections.section_id;
```
- **`LEFT JOIN`**: يسترجع جميع السجلات من الجدول الأيسر، وما يقابلها من الجدول الأيمن (إذا وُجدت).
- **`RIGHT JOIN`**: يسترجع جميع السجلات من الجدول الأيمن، وما يقابلها من الجدول الأيسر.
- **`SELF JOIN`**: لربط الجدول بنسخة ثانية من نفسه برمجياً (مفيد للمقارنات الداخلية مثل مدير وموظف في نفس الجدول).
- **`CROSS JOIN`**: الربط التبادلي (الجداء الديكارتي) لكافة الاحتمالات دون قيد.

## 10. بناء الاستعلامات الفرعية المتداخلة (`Subqueries`)
جملة استعلام داخلية (مغلقة محاطة بأقواس)، يتم تنفيذها أولاً لتعود بنتيجة محددة، ثم يمرر محرك القواعد هذه النتيجة تلقائياً لتصبح هي المعيار أو الشرط لجملة الاستعلام الخارجية.
```sql
SELECT * FROM students WHERE grade_score > (SELECT AVG(grade_score) FROM students);
```

## 11. إنشاء الجداول الافتراضية والمرجعية الثابتة (`CREATE VIEW`)
لحفظ وتأمين الاستعلامات المعقدة والمتكررة (مثل استعلام يحتوي على روابط متعددة ودوال تجميعية) وتخزينه كجدول افتراضي وهمي لتسهيل وتأمين استدعائه لاحقاً.
```sql
CREATE VIEW v_top_students AS 
SELECT student_name, grade_score FROM students WHERE grade_score >= 90;

-- للاستدعاء لاحقاً:
SELECT * FROM v_top_students;
```
