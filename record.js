const { chromium } = require('playwright');

(async () => {
  // فتح متصفح كروما في الخلفية
  const browser = await chromium.launch({ headless: true });
  
  // إعداد التبويب بدقة 1080p حقيقية وبدء تسجيل الفيديو في مجلد "videos"
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'videos/', // مسار حفظ الفيديو
      size: { width: 1920, height: 1080 } // دقة الفيديو النهائي
    }
  });

  const page = await context.newPage();
  
  console.log("Opening the website...");
  // ضع رابط الموقع الذي تريد تسجيله هنا
  await page.goto('https://vos.so/'); 

  // يمكنك هنا كتابة أكواد للضغط على أزرار أو عمل سكرول (Scroll)
  // كبداية: سنجعل المتصفح ينتظر لمدة 15 ثانية لتسجيل ما يحدث
  console.log("Recording for 15 seconds...");
  await page.waitForTimeout(15000); 

  // إغلاق التبويب والمتصفح (هذه الخطوة هي التي تقوم بحفظ ملف الـ MP4 نهائياً)
  await context.close();
  await browser.close();
  
  console.log("Recording saved successfully!");
})();
