# الدرس السادس عشر: التعديل والتحديث البرمجي للسجلات

## 1. استخلاص المعرّف الفريد للسجل `ID` المطلوب تعديله باستخدام `$_GET`
لإجراء التحديث، يجب أولاً تحديد السجل المراد تعديله بدقة لتجنب إتلاف بيانات السجلات الأخرى. نلتقط المعرف الفريد الذي يُرسل عادةً عبر الرابط (URL) عند الضغط على زر "تعديل" بجوار اسم الطالب.

```php
<?php
if (isset($_GET['id'])) {
    $user_id = $_GET['id'];
}
?>
```

## 2. استرجاع بيانات السجل الحالي وعرضها مسبقاً داخل نموذج التعديل (Data Pre-filling)
لتحسين تجربة المستخدم، يجب عرض البيانات القديمة داخل الخانات ليقوم المستخدم بتعديلها بدلاً من إعادة كتابتها من الصفر.

```php
<?php
// استرجاع البيانات
$query = "SELECT * FROM students WHERE student_id = $user_id";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
?>

<!-- عرض البيانات داخل النموذج -->
<form action="update_script.php" method="POST">
    <label>اسم الطالب:</label>
    <input type="text" name="student_name" value="<?php echo $row['student_name']; ?>">
</form>
```

## 3. توظيف حقل الإدخال المخفي (`Hidden Field`) لتمرير `ID` السجل بأمان
حتى يتمكن السيرفر من معرفة أي سجل سيقوم بتحديثه بعد ضغط المستخدم على زر "حفظ التعديلات"، نقوم بزرع حقل مخفي يحتوي على الـ `ID`. لن يراه المستخدم، ولكنه سيُرسل مع بيانات النموذج عبر `$_POST`.

```html
<!-- يُوضع داخل النموذج السابق -->
<input type="hidden" name="student_id" value="<?php echo $row['student_id']; ?>">
```

## 4. بناء استعلام التحديث البرمجي (`UPDATE`)
في الصفحة التي تستقبل البيانات (مثلاً `update_script.php`)، نقوم بالتقاط الـ `ID` المخفي والبيانات المعدلة ثم نصيغ أمر التحديث.

```php
<?php
if (isset($_POST['update_btn'])) {
    // استلام المعرف المخفي
    $user_id = $_POST['student_id'];
    
    // استلام القيمة المعدلة وتأمينها
    $new_name = mysqli_real_escape_string($conn, $_POST['student_name']);
    
    // صياغة أمر التحديث
    $query = "UPDATE students SET student_name = '$new_name' WHERE student_id = $user_id";
    
    // التنفيذ
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        // توجيه المتصفح لصفحة العرض بعد النجاح
        header("Location: index.php");
        exit();
    } else {
        echo "خطأ في التحديث: " . mysqli_error($conn);
    }
}
?>
```
> [!WARNING]
> نسيان جملة `WHERE` في استعلام التحديث سيؤدي إلى تطبيق التغيير على جميع سجلات الجدول! احذر جداً وتأكد من تضمين المعرف الفريد.
