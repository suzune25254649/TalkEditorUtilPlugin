var version = "1.1.4";
var filenameTalkEditorUtilZip = "v" + version + ".zip";
var dirnameTalkEditorUtil = "TalkEditorUtil-" + version

if (0 == WScript.Arguments.length)
{
	WScript.StdOut.WriteLine("Error: �N������������܂���B");
	WScript.Quit(1);
}

FS = new ActiveXObject("Scripting.FileSystemObject");
SH = new ActiveXObject('WScript.Shell');

if (!FS.FolderExists("download"))
{
	createFolder("download");
}

var filepathAviutl = WScript.Arguments(0);

if ("aviutl.exe" != FS.getFileName(filepathAviutl))
{
	println("Error: �h���b�O�C�����ꂽ�t�@�C�����Aaviutl.exe�ł͂���܂���B");
	WScript.Quit(1);
}

//	�C���X�g�[����t�H���_�̌���
var dirnameInstall = FS.GetParentFolderName(filepathAviutl);
if (FS.FileExists(dirnameInstall + "\\exedit.auf"))
{
	println('"' + dirnameInstall + '"' + "�ɃC���X�g�[�����܂��B");
}
else if (FS.FileExists(dirnameInstall + "\\plugins\\exedit.auf"))
{
	dirnameInstall += "\\plugins";
	println('"' + dirnameInstall + '"' + "�ɃC���X�g�[�����܂��B");
}
else
{
	println("Error: �g���ҏW�v���O�C���ł��� exedit.auf ����������܂���B");
	println("       �g���ҏW0.92�𓱓����Ă�������(0.93�͔�Ή��ł�)");
	WScript.Quit(1);
}


//	�C���X�g�[����ɂ���A�ߋ��̃t�@�C���Q������
var deletefilepaths = [
	"TalkEditorUtil.auf",
	"TalkEditorUtil.dll",
	"TalkEditorUtil.exa",
	"TalkEditorUtil/TalkEditorUtilPlugin.exa",
	"TalkEditorUtil/dropfiles/TalkEditorUtilPlugin.exa",
	"TalkEditorUtil/dropfiles/��������.exa",
	"TalkEditorUtil/dropfiles/����.exa",
	"TalkEditorUtil/RemoteTalkEditor32.exe",
	"TalkEditorUtil/RemoteTalkEditor64.exe",
	"TalkEditorUtil/Codeer.Friendly.dll",
	"TalkEditorUtil/Codeer.Friendly.Dynamic.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.Grasp.2.0.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.Grasp.3.5.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.NativeStandardControls.4.0.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.NativeStandardControls.dll",
	"TalkEditorUtil/Codeer.Friendly.Windows.NativeStandardControls.Generator.dll",
	"TalkEditorUtil/Codeer.TestAssistant.GeneratorToolKit.dll",
	"TalkEditorUtil/RM.Friendly.WPFStandardControls.3.0.dll",
	"TalkEditorUtil/RM.Friendly.WPFStandardControls.3.0.Generator.dll",
	"TalkEditorUtil/RM.Friendly.WPFStandardControls.3.5.dll",
	"TalkEditorUtil/RM.Friendly.WPFStandardControls.4.0.dll",
	"TalkEditorUtil/RM.Friendly.WPFStandardControls.4.0.Generator.dll",
];

createFolder("download/__temp__");
if (!cleanup(deletefilepaths, dirnameInstall, "download/__temp__"))
{
	//deleteFolder("download/__temp__");
	println("Error: �Z�b�g�A�b�v�Ɏ��s���܂����B");
	println("       ���L��Ή��̌�A������x��������������(����ł��_���Ȃ�PC�ċN����)");
	println("       �Eaviutl��S�ďI�����Ă��������B");
	println("       �E�g���Ă���Voiceoid2�AA.I.VOICE�A�K�C�m�C�h�̃G�f�B�^��S�ĕ��Ă�������");
	println("       �ERemoteTalkEditor64���I�����Ă�������(�^�X�N�g���C�Ɏc���Ă��܂��񂩁H)");
	WScript.Quit(1);
}
deleteFolder("download/__temp__");

//	TalkEditorUtil�̃_�E�����[�h�ƁA��
if (!FS.FileExists("download/" + filenameTalkEditorUtilZip))
{
	if (0 != download("https://github.com/suzune25254649/TalkEditorUtil/archive/refs/tags/" + filenameTalkEditorUtilZip, "download/" + filenameTalkEditorUtilZip))
	{
		println('Error: "' + filenameTalkEditorUtilZip + '"�̃_�E�����[�h�Ɏ��s���܂����B');
		if (FS.FileExists("download/" + filenameTalkEditorUtilZip))
		{
			deleteFile("download/" + filenameTalkEditorUtilZip);
		}
		WScript.Quit(1);
	}
}

deleteFolder("download/" + dirnameTalkEditorUtil);
var command = "powershell -NoProfile -ExecutionPolicy Unrestricted .\\tools\\unzip.ps1 download\\" + filenameTalkEditorUtilZip + " download";
SH.Run(command, 10, true);

//	�C���X�g�[�����s��
try
{
	FS.CopyFile("tools/aviutl_plugin/*", dirnameInstall);
	FS.CopyFolder("tools/aviutl_plugin/*", dirnameInstall);
	FS.CopyFile("download/" + dirnameTalkEditorUtil + "/tools/macro/RemoteTalkEditor*.exe", dirnameInstall + "/TalkEditorUtil");
	FS.CopyFile("download/" + dirnameTalkEditorUtil + "/tools/macro/*.dll", dirnameInstall + "/TalkEditorUtil");

	FS.CopyFolder("download/" + dirnameTalkEditorUtil + "/config", "./");
	FS.CopyFile("tools/config/*", "./config");
	WScript.Quit(0);
}
catch (error)
{
	println("Error: �Z�b�g�A�b�v�Ɏ��s���܂����B");
	WScript.Quit(1);
}

function print(text)
{
	WScript.StdOut.Write(text);
}

function println(text)
{
	WScript.StdOut.WriteLine(text);
}

function download(url, filenameSave)
{
	var command = "bitsadmin /transfer TalkEditorUtil�̃_�E�����[�h /PRIORITY FOREGROUND " + url + " " + FS.GetAbsolutePathName(filenameSave);
	return SH.Run(command, 10, true);
}

function createFolder(folderpath)
{
	if (FS.FolderExists(folderpath))
	{
		return true;
	}
	try
	{
		var parents = [];
		while ("" != folderpath && !FS.FolderExists(folderpath))
		{
			parents.push(folderpath);
			folderpath = FS.GetParentFolderName(folderpath);
		}
		
		parents = parents.reverse();
		for(var i = 0; i < parents.length; ++i)
		{
			FS.CreateFolder(parents[i]);
		}
		return true;
	}
	catch (error)
	{
	}
	return false;
}

function copyFolder(from, to)
{
	if (!FS.FolderExists(from))
	{
		return false;
	}

	try
	{
		FS.CopyFolder(from, to);
		return true;
	}
	catch (error)
	{
	}
	return false;
}

function deleteFolder(folderpath)
{
	if (!FS.FolderExists(folderpath))
	{
		return true;
	}
	try
	{
		FS.DeleteFolder(folderpath);
		return true;
	}
	catch (error)
	{
	}
	return false;
}

function copyFile(from, to)
{
	if (!FS.FileExists(from))
	{
		return false;
	}

	try
	{
		createFolder(FS.GetParentFolderName(to));
		FS.CopyFile(from, to);
		return true;
	}
	catch (error)
	{
	}
	return false;
}

function moveFile(from, to)
{
	if (!FS.FileExists(from))
	{
		return false;
	}

	try
	{
		createFolder(FS.GetParentFolderName(to));
		FS.MoveFile(from, to);
		return true;
	}
	catch (error)
	{
	}
	return false;
}

function deleteFile(filepath)
{
	if (!FS.FileExists(filepath))
	{
		return true;
	}

	try
	{
		FS.DeleteFile(filepath);
		return true;
	}
	catch (error)
	{
	}
	return false;
}

/**
�w��̃t�@�C���Q�̍폜���s�����A�r����1�t�@�C���ł����s�����ꍇ�͊����߂�
*/
function cleanup(filepaths, from_dirname, temp_dirname)
{
	var flg = false;
	var rollbacks = [];
	
	for (var i = 0; i < filepaths.length; i++)
	{
		if (undefined == filepaths[i])
		{
			continue;
		}
		
		if (!FS.FileExists(from_dirname + "/" + filepaths[i]))
		{
			continue;
		}
		if (!copyFile(from_dirname + "/" + filepaths[i], temp_dirname + "/" + filepaths[i]))
		{
			//FS.DeleteFolder(temp_dirname);
			println("copyFile:" + from_dirname + "/" + filepaths[i]);
			return false;
		}
		if (!deleteFile(from_dirname + "/" + filepaths[i]))
		{
			println("�폜�ł��Ȃ��t�@�C��������܂� : \"" + filepaths[i] + "\"");
			flg = true;
			break;
		}
		rollbacks.push(filepaths[i]);
	}
	
	if (!flg)
	{
		return true;
	}
	
	for (var i = 0; i < rollbacks.length; i++)
	{
		moveFile(temp_dirname + "/" + rollbacks[i], from_dirname + "/" + rollbacks[i]);
	}
	FS.DeleteFolder(temp_dirname);
	return false;
}
