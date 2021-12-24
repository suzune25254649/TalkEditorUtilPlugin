var version = "1.1.4";
var filenameTalkEditorUtilZip = "v" + version + ".zip";
var dirnameTalkEditorUtil = "TalkEditorUtil-" + version

if (0 == WScript.Arguments.length)
{
	WScript.StdOut.WriteLine("Error: 起動引数が足りません。");
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
	println("Error: ドラッグインされたファイルが、aviutl.exeではありません。");
	WScript.Quit(1);
}

//	インストール先フォルダの決定
var dirnameInstall = FS.GetParentFolderName(filepathAviutl);
if (FS.FileExists(dirnameInstall + "\\exedit.auf"))
{
	println('"' + dirnameInstall + '"' + "にインストールします。");
}
else if (FS.FileExists(dirnameInstall + "\\plugins\\exedit.auf"))
{
	dirnameInstall += "\\plugins";
	println('"' + dirnameInstall + '"' + "にインストールします。");
}
else
{
	println("Error: 拡張編集プラグインである exedit.auf が見当たりません。");
	println("       拡張編集0.92を導入してください(0.93は非対応です)");
	WScript.Quit(1);
}


//	インストール先にある、過去のファイル群を消す
var deletefilepaths = [
	"TalkEditorUtil.auf",
	"TalkEditorUtil.dll",
	"TalkEditorUtil.exa",
	"TalkEditorUtil/TalkEditorUtilPlugin.exa",
	"TalkEditorUtil/dropfiles/TalkEditorUtilPlugin.exa",
	"TalkEditorUtil/dropfiles/字幕準備.exa",
	"TalkEditorUtil/dropfiles/統合.exa",
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
	println("Error: セットアップに失敗しました。");
	println("       下記を対応の後、もう一度お試しください(それでもダメならPC再起動を)");
	println("       ・aviutlを全て終了してください。");
	println("       ・使っていたVoiceoid2、A.I.VOICE、ガイノイドのエディタを全て閉じてください");
	println("       ・RemoteTalkEditor64を終了してください(タスクトレイに残っていませんか？)");
	WScript.Quit(1);
}
deleteFolder("download/__temp__");

//	TalkEditorUtilのダウンロードと、解凍
if (!FS.FileExists("download/" + filenameTalkEditorUtilZip))
{
	if (0 != download("https://github.com/suzune25254649/TalkEditorUtil/archive/refs/tags/" + filenameTalkEditorUtilZip, "download/" + filenameTalkEditorUtilZip))
	{
		println('Error: "' + filenameTalkEditorUtilZip + '"のダウンロードに失敗しました。');
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

//	インストールを行う
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
	println("Error: セットアップに失敗しました。");
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
	var command = "bitsadmin /transfer TalkEditorUtilのダウンロード /PRIORITY FOREGROUND " + url + " " + FS.GetAbsolutePathName(filenameSave);
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
指定のファイル群の削除を行うが、途中で1ファイルでも失敗した場合は巻き戻す
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
			println("削除できないファイルがあります : \"" + filepaths[i] + "\"");
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
