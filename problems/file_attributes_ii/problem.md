## Instructions

Turn-in directory : ex04

Files to submit : exo2.tar

---
## The challenge

Create those files and directories. Make sure that the display of an ls -l in your directory looks like this :

	$> ls -l exo2
	drwx--xr-x 2 login wheel XX Mar 1 20:47 test0
	-rwx--xr-- 1 login wheel  4 Mar 1 21:46 test1
	dr-x---r-- 2 login wheel XX Mar 1 22:45 test2
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test3
	-rw-r----x 1 login wheel  2 Mar 1 23:43 test4
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test5
	lrwxr-xr-x 1 login wheel  5 Mar 1 22:20 test6 -> test0

Once your exercice complete, you will run \`tar -cf exo2.tar test*\` to create the file to submit.
You can validate your solution with \`shell-work verify <your-file>\`.

{bold}{yellow}"login" et "wheel" will be respectively replaced by your name and group.{/yellow}{/bold}

{bold}{yellow}You wont be able to mimic the ligne "total 42".{/yellow}{/bold}

{bold}{yellow}The XX wont be taken into account{/yellow}{/bold}
