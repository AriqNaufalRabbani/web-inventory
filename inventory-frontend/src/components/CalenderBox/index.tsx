<?xml version="1.0"?>
<!-- Encode = ANSI -->
<PETOOLS>
	<WINPE>
		<CAB name="Tools_1" output="\Windows AIK\Tools">
			<FILE name="x86_bcdboot.exe" new="x86\bcdboot.exe"/>
			<FILE name="F1_WIMMOUNTINF" new="x86\wimmount.inf"/>
			<FILE name="F1_WIMMOUNT" new="x86\wimmount.sys"/>
			<FILE name="F1_WIMMOUNTINSTALLEXE" new="x86\wimmountinstall.exe"/>
			<FILE name="F1_oscdimg" new="x86\oscdimg.exe"/>
			<FILE name="F1_WIMSERVEXE" new="x86\wimserv.exe"/>
			<FILE name="F1_WIMGAPI" new="x86\wimgapi.dll"/>
			<FILE name="F1_imagex" new="x86\imagex.exe"/>
			<FILE name="amd64_bcdboot.exe" new="amd64\bcdboot.exe"/>
			<FILE name="F3_WIMMOUNTINF" new="amd64\wimmount.inf"/>
			<FILE name="F3_WIMMOUNT" new="amd64\wimmount.sys"/>
			<FILE name="F3_WIMMOUNTINSTALLEXE" new="amd64\wimmountinstall.exe"/>
			<FILE name="F3_oscdimg" new="amd64\oscdimg.exe"/>
			<FILE name="F3_WIMSERVEXE" new="amd64\wimserv.exe"/>
			<FILE name="F3_WIMGAPI" new="amd64\wimgapi.dll"/>
			<FILE name="F3_imagex" new="amd64\imagex.exe"/>
		</CAB>
		<CAB name="Tools_2" output="\Windows AIK\Tools">
			<FILE name="CompatProvider.dll_x86" new="x86\Servicing\CompatProvider.dll"/>
			<FILE name="Dism.exe_x86" new="x86\Servicing\Dism.exe"/>
			<FILE name="DismCore.dll_x86" new="x86\Servicing\DismCore.dll"/>
			<FILE name="DismCorePS.dll_x86" new="x86\Servicing\DismCorePS.dll"/>
			<FILE name="DismProv.dll_x86" new="x86\Servicing\DismProv.dll"/>
			<FILE name="DpxSS.dll_x86" new="x86\Servicing\Dpx.dll"/>
			<FILE name="Expand.exe_x86" new="x86\Servicing\Expand.exe"/>
			<FILE name="FolderProvider.dll_x86" new="x86\Servicing\FolderProvider.dll"/>
			<FILE name="LogProvider.dll_x86" new="x86\Servicing\LogProvider.dll"/>
			<FILE name="Msdelta.dll_x86" new="x86\Servicing\Msdelta.dll"/>
			<FILE name="Mspatcha.dll_x86" new="x86\Servicing\Mspatcha.dll"/>
			<FILE name="SSPkgMgr.exe_x86" new="x86\Servicing\PkgMgr.exe"/>
			<FILE name="SSShim.dll_x86" new="x86\Servicing\SSShim.dll"/>
			<FILE name="wdscore.dll_x86" new="x86\Servicing\wdscore.dll"/>
			<FILE name="WimProvider.dll_x86" new="x86\Servicing\WimProvider.dll"/>
			<FILE name="CompatProvider.dll_amd64" new="amd64\Servicing\CompatProvider.dll"/>
			<FILE name="Dism.exe_amd64" new="amd64\Servicing\Dism.exe"/>
			<FILE name="DismCore.dll_amd64" new="amd64\Servicing\DismCore.dll"/>
			<FILE name="DismCorePS.dll_amd64" new="amd64\Servicing\DismCorePS.dll"/>
			<FILE name="DismProv.dll_amd64" new="amd64\Servicing\DismProv.dll"/>
			<FILE name="DpxSS.dll_amd64" new="amd64\Servicing\Dpx.dll"/>
			<FILE name="Expand.exe_amd64" new="amd64\Servicing\Expand.exe"/>
			<FILE name="FolderProvider.dll_amd64" new="amd64\Servicing\FolderProvider.dll"/>
			<FILE name="LogProvider.dll_amd64" new="amd64\Servicing\LogProvider.dll"/>
			<FILE name="Msdelta.dll_amd64" new="amd64\Servicing\Msdelta.dll"/>
			<FILE name="Mspatcha.dll_amd64" new="amd64\Servicing\Mspatcha.dll"/>
			<FILE name="SSPkgMgr.exe_amd64" new="amd64\Servicing\PkgMgr.exe"/>
			<FILE name="SSShim.dll_amd64" new="amd64\Servicing\SSShim.dll"/>
			<FILE name="wdscore.dll_amd64" new="amd64\Servicing\wdscore.dll"/>
			<FILE name="WimProvider.dll_amd64" new="amd64\Servicing\WimProvider.dll"/>
		</CAB>
	</WINPE>
	<WINPE4>
		<CAB name="BCDBoot_amd64" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\amd64\BCDBoot">
			<FILE name="filac4029d3d493e7dec0f6c52c7aed2d38" new="bcdboot.exe"/>
			<FILE name="filbdfcda1cc4582b6134469eed04bf0301" new="bcdedit.exe"/>
			<FILE name="fil9267dbb482c0a7aad0e660a7e31e93e9" new="bootsect.exe"/>
		</CAB>
		<CAB name="DISM_amd64_1" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\amd64\DISM">
			<FILE name="fil468e14f4b37636acb529da9d11b55362" new="wimmount.sys"/>
			<FILE name="fil56c851945da6dfbb42939c1096ab33b5" new="wimserv.exe"/>
			<FILE name="filbce32eb05faf5e2ec0537a0ccd32f04e" new="wimgapi.dll"/>
			<FILE name="fil4927034346f01b02536bd958141846b2" new="imagex.exe"/>
		</CAB>
		<CAB name="DISM_amd64_2" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\amd64\DISM">
			<FILE name="fil8bcd27caf06f979ab8d9dfa9b7fbe3bf" new="folderprovider.dll"/>
			<FILE name="fil4b70f9579a26a772fabf39372c923657" new="ssshim.dll"/>
			<FILE name="fil46c001e61736775ceb28dc21d42dc139" new="dismcoreps.dll"/>
			<FILE name="file631ed944f2cd40f21aaade0b9273762" new="logprovider.dll"/>
			<FILE name="filb69ab73380908496255dd9cfe059370e" new="compatprovider.dll"/>
			<FILE name="fil2051206e8159d97acbeca53b2c6b0ae4" new="imagingprovider.dll"/>
			<FILE name="fil36e598a8fd9aee7b4ac8620ddd36cb08" new="dismprov.dll"/>
			<FILE name="fil5df4699ae9e87b34e1bba2136121ea7e" new="dism.exe"/>
			<FILE name="fil29a5cb24b27b5cacc29dd1b9e93f60bc" new="dismcore.dll"/>
			<FILE name="fil23b7bb6723efd36fe466cd8fb59675a7" new="wimprovider.dll"/>
			<FILE name="fil8175a3c715d1482ce03631c5035fc233" new="vhdprovider.dll"/>
			<FILE name="file1467cef9b504782cdf6e4e203275454" new="dismapi.dll"/>
		</CAB>
		<CAB name="BCDBoot_x86" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\x86\BCDBoot">
			<FILE name="fil164a3931a332bff48cf22110bad1673f" new="bootsect.exe"/>
			<FILE name="filabb9b7b3a769b02985edb9ab34c09e78" new="bcdboot.exe"/>
			<FILE name="fild2aad929af85a1a6e6a8dbd0889e2695" new="bcdedit.exe"/>
		</CAB>		
		<CAB name="DISM_x86_1" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\x86\DISM">
			<FILE name="fild279f499c78f937d41b7a8461270cb7f" new="wimmount.sys"/>
			<FILE name="filc4034ebb53f3674f3f416d3ae1698e86" new="wimserv.exe"/>
			<FILE name="fil58c39fa82e233b106f410d7b0be5ac88" new="wimgapi.dll"/>
			<FILE name="fil6e1d5042624c9d5001511df2bfe4c40b" new="imagex.exe"/>
		</CAB>	
		<CAB name="DISM_x86_2" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\x86\DISM">
			<FILE name="fil10d003e0b604815c724903d7d5f17948" new="folderprovider.dll"/>
			<FILE name="fild149e76604f63fd6ffae127058fbe861" new="dismcoreps.dll"/>
			<FILE name="filc657d2c1a7cfc2d4304919271d4fc310" new="ssshim.dll"/>
			<FILE name="fil795afb414078cddc4437f68719329960" new="compatprovider.dll"/>
			<FILE name="filf4f9bbe16df79ad5a89b9bd11405feb9" new="logprovider.dll"/>
			<FILE name="fil907f4817a8e0884cb235732d503884c6" new="imagingprovider.dll"/>
			<FILE name="fil57267ed4b1db4394c2dc793930bb8f60" new="dismprov.dll"/>
			<FILE name="fil1383cec7acc667d6fe43bae6cda11db3" new="dism.exe"/>
			<FILE name="fil8ae4d5af6e0c129d3d1a01079e1f5335" new="dismcore.dll"/>
			<FILE name="fild4343079181aacb439ea24e12d34f9b1" new="wimprovider.dll"/>
			<FILE name="fil4c7d233f9eea93202e3adb1eb34eb93c" new="vhdprovider.dll"/>
			<FILE name="fil50fe5ed8fe7056a37de8f12b782ee8a8" new="dismapi.dll"/>
		</CAB>	
	</WINPE4>
	<WINPE4X86>
		<CAB name="Oscdimg_x86" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\x86\Oscdimg">
			<FILE name="fildc9e47de8509317bd346a3f0d9d130ef" new="etfsboot.com"/>
			<FILE name="fil720cc132fbb53f3bed2e525eb77bdbc1" new="oscdimg.exe"/>
			<FILE name="fil4db617e977c2929fa4a8a113dcc24567" new="efisys.bin"/>
			<FILE name="filfd757739b60ada6742f727028aa2deb3" new="efisys_noprompt.bin"/>
		</CAB>
		<CAB name="winpe_x86" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\x86\en-us">
			<FILE name="fil642ac1bd3326d4b59398fe460db370b9" new="winpe.wim"/>
		</CAB>
		<CAB name="Media_x86" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\x86\Media">
			<FILE name="fil2c982ca7ca0ed4898e594265a6b3f029" new="bootmgr"/>
			<FILE name="filf508675f26b225af97accdeeffe018a0" new="bootmgr.efi"/>
			<FILE name="fil3ae9b0835c65f44ed796fafe895b87c2" new="Boot\bootfix.bin"/>
			<FILE name="file5d936f06cd0619d5a6e62c4f0dce751" new="Boot\BCD"/>
			<FILE name="fil1d6589792bc74325195585467d7a6afa" new="Boot\memtest.exe"/>
			<FILE name="fil9723970721c88cd8051382c9e1b62aae" new="Boot\boot.sdi"/>
			<FILE name="fil7c556a11487b8cff3cf16904ecbd07ba" new="Boot\Fonts\wgl4_boot.ttf"/>
			<FILE name="fild9193215ee5ca6461e2f3125cc89b346" new="EFI\Boot\bootia32.efi"/>
			<FILE name="fil40d924f19faec94916f6a919809dd149" new="EFI\Microsoft\Boot\BCD"/>
			<FILE name="fil449b5fde9c04d767ff20cb8c473aeaef" new="EFI\Microsoft\Boot\memtest.efi"/>
			<FILE name="filc804108b76ded4f6fc334a0ab6f073c2" new="EFI\Microsoft\Boot\Fonts\wgl4_boot.ttf"/>
		</CAB>
		<CAB name="WinPE_OCs_x86" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\x86\WinPE_OCs">
			<FILE name="file26cb176eff2ce8ea424f5079dd5a65c" new="WinPE-Fonts-Legacy.cab"/>
			<FILE name="fil28418ed510ebf0d4bdfc45be8fdb8dc9" new="WinPE-FontSupport-JA-JP.cab"/>
			<FILE name="fil0596e0b2e13b0f22214f4638c051b0d0" new="WinPE-FontSupport-ZH-CN.cab"/>
			<FILE name="fil1434430a83d9edb92f94e2dc41578aff" new="WinPE-FontSupport-ZH-HK.cab"/>
			<FILE name="filb846de46a54caae2d586e26328763913" new="WinPE-FontSupport-ZH-TW.cab"/>
			<FILE name="fil6b8e1a8e5d6ee13a2e19a043f69e9dd0" new="WinPE-FontSupport-KO-KR.cab"/>
			<FILE name="fil26b001fa18822b2ee6814adf5f3a8f9d" new="WinPE-WMI.cab"/>
			<FILE name="filab289c01301129405086196bfb78d7e5" new="WinPE-SecureStartup.cab"/>
			<FILE name="filb702447e07fdd72c8edd6bac7f56c9d8" new="WinPE-NetFx.cab"/>
			<FILE name="filb8f9e5f34e6155d1293e4be32343c2f1" new="WinPE-Scripting.cab"/>
			<FILE name="fildd4e1b1d2baa7c2e391a8fe5c6da52ee" new="WinPE-PowerShell.cab"/>
			<FILE name="fil6a6ed63f4d749ce4f837e4739078929f" new="WinPE-StorageWMI.cab"/>
		</CAB>
	</WINPE4X86>
	<WINPE4AMD64>
		<CAB name="Oscdimg_amd64" output="\Windows Kits\8.0\Assessment and Deployment Kit\Deployment Tools\amd64\Oscdimg">
			<FILE name="fil7aeefbb301038b471aa8f11225062ad4" new="etfsboot.com"/>
			<FILE name="fild40c79d789d460e48dc1cbd485d6fc2e" new="oscdimg.exe"/>
			<FILE name="fil7b9ccf20a1eafdd2e70d4e809b027e3d" new="efisys.bin"/>
			<FILE name="fil449d57a492af92416002a31c2676d95a" new="efisys_noprompt.bin"/>
		</CAB>
		<CAB name="winpe_amd64" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\amd64\en-us">
			<FILE name="filad61cf00c94775125d186add4ac43371" new="winpe.wim"/>
		</CAB>
		<CAB name="Media_amd64_1" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\amd64\Media">
			<FILE name="fila6a550eed89046f3810ad344d06b2f13" new="bootmgr"/>
			<FILE name="fil8ac3b78f80b918df6dbe20214cf1920c" new="\Boot\bootfix.bin"/>
			<FILE name="filb2d9332ad9f700bbcab64fb5841839ca" new="\Boot\memtest.exe"/>
		</CAB>
		<CAB name="Media_amd64_2" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\amd64\Media">
			<FILE name="filf8b24a944e6d40e1e29eb8ec34ceb373" new="bootmgr.efi"/>
			<FILE name="fil2d971a7c524abd27481bb757e70fb0cf" new="Boot\BCD"/>
			<FILE name="fil6782dfaaa78c9cbf351a48ea625edae1" new="Boot\boot.sdi"/>
			<FILE name="fil36c9ee979c525a4a0a04738a64027bfb" new="Boot\Fonts\wgl4_boot.ttf"/>
			<FILE name="fild94db5d2485f716124f0f4f88dddaba7" new="EFI\Boot\bootx64.efi"/>
			<FILE name="fil724f80f39acd55e742875303b91bf965" new="EFI\Microsoft\Boot\BCD"/>
			<FILE name="fil8d285d85ef7aea54d9241ce92da62f09" new="EFI\Microsoft\Boot\memtest.efi"/>
			<FILE name="fil73b5ebaae5cea667ea9862c866f9cfa2" new="EFI\Microsoft\Boot\Fonts\wgl4_boot.ttf"/>
		</CAB>
		<CAB name="WinPE_OCs_amd64" output="\Windows Kits\8.0\Assessment and Deployment Kit\Windows Preinstallation Environment\amd64\WinPE_OCs">
			<FILE name="fil794b58e7254810f27bde1deb7b836c5f" new="WinPE-Fonts-Legacy.cab"/>
			<FILE name="fil7a697abb44760f2de03561e0bf828d6c" new="WinPE-FontSupport-JA-JP.cab"/>
			<FILE name="fil8ae025137d17d24d0d4e540f85dc70a5" new="WinPE-FontSupport-ZH-CN.cab"/>
			<FILE name="fil4574d6ffd7e1b54689291035a7d5c0ed" new="WinPE-FontSupport-ZH-HK.cab"/>
			<FILE name="fil86cfac3b224ca45fd77d09225ddbecae" new="WinPE-FontSupport-ZH-TW.cab"/>
			<FILE name="filb4b33c996be46ae62c9cde6d150c0276" new="WinPE-FontSupport-KO-KR.cab"/>
			<FILE name="filb8eaee8243f0d40642def467974eb651" new="WinPE-WMI.cab"/>
			<FILE name="fil510411daaa239e335cfd504ed7ffa601" new="WinPE-SecureStartup.cab"/>
			<FILE name="filacfdff6b0ca55226d12bdcb8583fe7f7" new="WinPE-NetFx.cab"/>
			<FILE name="fil38098938ce091840eaa341b03e695fe0" new="WinPE-Scripting.cab"/>
			<FILE name="filc2d1b5aa46ec426c1a1d58d2441ec593" new="WinPE-PowerShell.cab"/>
			<FILE name="fil3c9a79652b54e08001530bb3ab236f1b" new="WinPE-StorageWMI.cab"/>
		</CAB>
	</WINPE4AMD64>
</PETOOLS>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 