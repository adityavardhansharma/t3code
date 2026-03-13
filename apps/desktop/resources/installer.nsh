!define T3CODE_DIRECTORY_SHELL_KEY "Software\Classes\Directory\shell\T3Code.OpenInT3Code"
!define T3CODE_DIRECTORY_BACKGROUND_SHELL_KEY "Software\Classes\Directory\Background\shell\T3Code.OpenInT3Code"

!macro WriteT3CodeContextMenuEntries
  WriteRegStr HKCU "${T3CODE_DIRECTORY_SHELL_KEY}" "" "Open in T3 Code"
  WriteRegStr HKCU "${T3CODE_DIRECTORY_SHELL_KEY}" "Icon" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCU "${T3CODE_DIRECTORY_SHELL_KEY}\command" "" "$\"$INSTDIR\${APP_EXECUTABLE_FILENAME}$\" $\"%1$\""

  WriteRegStr HKCU "${T3CODE_DIRECTORY_BACKGROUND_SHELL_KEY}" "" "Open in T3 Code"
  WriteRegStr HKCU "${T3CODE_DIRECTORY_BACKGROUND_SHELL_KEY}" "Icon" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCU "${T3CODE_DIRECTORY_BACKGROUND_SHELL_KEY}\command" "" "$\"$INSTDIR\${APP_EXECUTABLE_FILENAME}$\" $\"%V$\""
!macroend

!macro DeleteT3CodeContextMenuEntries
  DeleteRegKey HKCU "${T3CODE_DIRECTORY_SHELL_KEY}"
  DeleteRegKey HKCU "${T3CODE_DIRECTORY_BACKGROUND_SHELL_KEY}"
!macroend

!macro customInstall
  !insertmacro WriteT3CodeContextMenuEntries
!macroend

!macro customUnInstall
  !insertmacro DeleteT3CodeContextMenuEntries
!macroend
