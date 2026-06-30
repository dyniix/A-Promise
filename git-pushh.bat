@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

mode con cols=78 lines=28 2>nul

:: ─── ANSI Colors ───
for /f %%a in ('powershell -NoProfile -Command "[char]27" 2^>nul') do set "ESC=%%a"
set "CYAN=%ESC%[96m"
set "GREEN=%ESC%[92m"
set "YELLOW=%ESC%[93m"
set "RED=%ESC%[91m"
set "GRAY=%ESC%[90m"
set "WHITE=%ESC%[37m"
set "BOLD=%ESC%[1m"
set "RESET=%ESC%[0m"

set "VERSION=v1.0"
set "AUTHOR=dynix"

:: ═══════════════════════════════════════════════════════════════
::  HOME SCREEN
:: ═══════════════════════════════════════════════════════════════

:home
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %BOLD%%WHITE%    Automate Git workflow for any local repository.%RESET%
echo.
echo.
echo  %WHITE%    +----------------------------------+
echo  %WHITE%    ^|          Select Folder           ^|
echo  %WHITE%    +----------------------------------+%RESET%
echo.
echo.
echo  %GRAY%    Choose any local folder.%RESET%
echo  %GRAY%    If it contains a Git repository%RESET%
echo  %GRAY%    it will be detected automatically.%RESET%
echo.
echo.
echo  %GRAY%    %VERSION%  ^|  %AUTHOR%  ^|%RESET%  %GREEN%ready%RESET%
echo.
echo  %WHITE%    [1]%RESET% Select Folder  %WHITE%[2]%RESET% Exit
choice /c 12 /n >nul
if errorlevel 2 exit /b

cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %BOLD%%WHITE%    Select Folder%RESET%
echo.
echo  %GRAY%    Opening folder picker...%RESET%
echo.
goto :pick

:: ═══════════════════════════════════════════════════════════════
::  FOLDER PICKER
:: ═══════════════════════════════════════════════════════════════

:pick
set "PS_SCRIPT=%TEMP%\dynix_picker.ps1"
echo Add-Type -AssemblyName System.Windows.Forms > "%PS_SCRIPT%"
echo [System.Windows.Forms.Application]::EnableVisualStyles()>> "%PS_SCRIPT%"
echo $f = New-Object System.Windows.Forms.OpenFileDialog>> "%PS_SCRIPT%"
echo $f.ValidateNames = $false>> "%PS_SCRIPT%"
echo $f.CheckFileExists = $false>> "%PS_SCRIPT%"
echo $f.CheckPathExists = $true>> "%PS_SCRIPT%"
echo $f.FileName = 'Select a folder'>> "%PS_SCRIPT%"
echo $f.Title = 'Select a Git repository'>> "%PS_SCRIPT%"
echo if ($f.ShowDialog() -eq 'OK') { Write-Output ([System.IO.Path]::GetDirectoryName($f.FileName)) }>> "%PS_SCRIPT%"
for /f "tokens=* delims=" %%A in ('powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"') do set "REPO_PATH=%%A"
if exist "%PS_SCRIPT%" del "%PS_SCRIPT%"

if "%REPO_PATH%"=="" goto :home

:: ─── Validate ───
git -C "%REPO_PATH%" rev-parse --git-dir >nul 2>&1
if errorlevel 1 goto :notrepo

:: ─── Gather Info ───
for /f "tokens=*" %%a in ('git -C "%REPO_PATH%" rev-parse --show-toplevel 2^>nul') do set "REPO_ROOT=%%a"
for /f "delims=" %%a in ("%REPO_ROOT%") do set "REPO_NAME=%%~nxa"
for /f "tokens=*" %%a in ('git -C "%REPO_PATH%" branch --show-current 2^>nul') do set "BRANCH=%%a"
for /f "tokens=*" %%a in ('git -C "%REPO_PATH%" remote 2^>nul') do set "REMOTE=%%a"
if not defined BRANCH set "BRANCH=(detached)"
if not defined REMOTE set "REMOTE=(none)"
if not defined REPO_NAME set "REPO_NAME=Unknown"

set "MODIFIED=0"
for /f %%a in ('git -C "%REPO_ROOT%" status --porcelain 2^>nul ^| find /c /v ""') do set "MODIFIED=%%a"
goto :dashboard

:: ═══════════════════════════════════════════════════════════════
::  NOT A REPOSITORY
:: ═══════════════════════════════════════════════════════════════

:notrepo
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %YELLOW%    No Git Repository Detected%RESET%
echo.
echo  %GRAY%    The selected folder does not contain%RESET%
echo  %GRAY%    a Git repository.%RESET%
echo.
echo.
echo  %WHITE%    [1]%RESET%  Try a different folder
echo  %WHITE%    [2]%RESET%  Exit
choice /c 12 /n >nul
if errorlevel 2 exit /b
goto :pick

:: ═══════════════════════════════════════════════════════════════
::  DASHBOARD
:: ═══════════════════════════════════════════════════════════════

:dashboard
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GRAY%    Repository :%RESET%  %WHITE%%REPO_NAME%%RESET%
echo  %GRAY%    Branch     :%RESET%  %WHITE%%BRANCH%%RESET%
echo  %GRAY%    Remote     :%RESET%  %WHITE%%REMOTE%%RESET%
echo  %GRAY%    Changes    :%RESET%  %WHITE%%MODIFIED% modified%RESET%
echo.
echo  %BOLD%%WHITE%    Actions%RESET%
echo.
echo  %WHITE%    [1]%RESET%  Sync Repository
echo  %WHITE%    [2]%RESET%  Git Status
echo  %WHITE%    [3]%RESET%  Open Repository Folder
echo  %WHITE%    [4]%RESET%  Change Repository
echo  %WHITE%    [5]%RESET%  Exit
echo.
echo  %GRAY%    %VERSION%  ^|  %AUTHOR%  ^|%RESET%  %GREEN%ready%RESET%
echo.
choice /c 12345 /n >nul
if errorlevel 5 exit /b
if errorlevel 4 goto :home
if errorlevel 3 start "" "%REPO_ROOT%" & goto :dashboard
if errorlevel 2 goto :status
goto :sync

:: ═══════════════════════════════════════════════════════════════
::  STATUS
:: ═══════════════════════════════════════════════════════════════

:status
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GRAY%    %REPO_NAME%  --  Status%RESET%
echo.
git -C "%REPO_ROOT%" status
echo.
echo  %GRAY%    Press any key to go back.%RESET%
pause >nul
goto :dashboard

:: ═══════════════════════════════════════════════════════════════
::  SYNC
:: ═══════════════════════════════════════════════════════════════

:sync
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GRAY%    %REPO_NAME%  --  %BRANCH%%RESET%
echo.
echo  %GRAY%    [1/3]  Stage Changes%RESET%
git -C "%REPO_ROOT%" add . >nul 2>&1
if errorlevel 1 (
  echo  %RED%          Failed%RESET%
  echo.
  echo  %GRAY%    Press any key to go back.%RESET%
  pause >nul
  goto :dashboard
)

cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GRAY%    %REPO_NAME%  --  %BRANCH%%RESET%
echo.
echo  %GREEN%    [1/3]  Stage Changes ...... Done%RESET%
echo  %GRAY%    [2/3]  Creating Commit%RESET%

set "COMMITTED=0"
for /f %%a in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd | HH:mm:ss'"') do set "TIMESTAMP=%%a"
set "COMMIT_MSG=Updated | %TIMESTAMP%"
git -C "%REPO_ROOT%" commit -m "%COMMIT_MSG%" >nul 2>&1
if errorlevel 1 (
  git -C "%REPO_ROOT%" diff --cached --quiet >nul 2>&1
  if !errorlevel! equ 0 (
    goto :sync_nocommit
  )
  echo  %RED%          Failed%RESET%
  echo.
  echo  %GRAY%    Press any key to go back.%RESET%
  pause >nul
  goto :dashboard
)
set "COMMITTED=1"

cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GRAY%    %REPO_NAME%  --  %BRANCH%%RESET%
echo.
echo  %GREEN%    [1/3]  Stage Changes ...... Done%RESET%
echo  %GREEN%    [2/3]  Creating Commit .... Done%RESET%
echo  %GRAY%    [3/3]  Uploading%RESET%

git -C "%REPO_ROOT%" push
if errorlevel 1 (
  echo  %RED%          Push failed%RESET%
  echo.
  echo  %GRAY%    Press any key to go back.%RESET%
  pause >nul
  goto :dashboard
)
goto :sync_success

:: ─── Nothing to Commit ───

:sync_nocommit
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GREEN%    +----------------------------------+
echo  %GREEN%    ^|          Sync Complete           ^|
echo  %GREEN%    +----------------------------------+%RESET%
echo.
echo  %GRAY%    Repository :%RESET%  %WHITE%%REPO_NAME%%RESET%
echo  %GRAY%    Branch     :%RESET%  %WHITE%%BRANCH%%RESET%
echo  %GRAY%    Status     :%RESET%  %GREEN%Up to date%RESET%
echo.
echo  %WHITE%    [1]%RESET%  Back to Repository
echo  %WHITE%    [2]%RESET%  Exit
choice /c 12 /n >nul
if errorlevel 2 exit /b
goto :dashboard

:: ─── Sync Success ───

:sync_success
cls
echo.
echo.
echo  %CYAN%    +------------------------------------------+
echo  %CYAN%    ^|         DYNIX Git Synchronizer            ^|
echo  %CYAN%    +------------------------------------------+%RESET%
echo.
echo  %GREEN%    +----------------------------------+
echo  %GREEN%    ^|          Sync Complete           ^|
echo  %GREEN%    +----------------------------------+%RESET%
echo.
echo  %GRAY%    Repository :%RESET%  %WHITE%%REPO_NAME%%RESET%
echo  %GRAY%    Branch     :%RESET%  %WHITE%%BRANCH%%RESET%
echo  %GRAY%    Commit     :%RESET%  %WHITE%%COMMIT_MSG%%RESET%
echo  %GRAY%    Remote     :%RESET%  %WHITE%%REMOTE%%RESET%
echo  %GRAY%    Status     :%RESET%  %GREEN%Synchronized%RESET%
echo.
echo  %WHITE%    [1]%RESET%  Back to Repository
echo  %WHITE%    [2]%RESET%  Exit
choice /c 12 /n >nul
if errorlevel 2 exit /b
goto :dashboard
