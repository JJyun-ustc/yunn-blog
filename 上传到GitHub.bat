@echo off
echo ========================================
echo    博客代码上传脚本
echo ========================================
echo.

echo [1/3] 检查 Git 状态...
git status

echo.
echo [2/3] 添加所有修改的文件...
git add .

echo.
echo [3/3] 提交并推送到 GitHub...
git commit -m "更新配置：修复部署问题"
git push

echo.
echo ========================================
echo    上传完成！
echo ========================================
echo.
echo 请访问 GitHub 仓库查看 Actions 是否成功运行
echo https://github.com/你的用户名/yunn-blog/actions
echo.
pause
