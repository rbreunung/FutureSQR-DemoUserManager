export class BackendModelFullUserEntry {
	public uuid: string = "";
	public loginname: string = "";
	public displayname: string = "";
	public avatarlocation: string = "";
	public cvsNames: string[] = [];
	public roles: string[] = [];
	public email: string = "";
	public isbanned: boolean = false;
	public created?: number;
	public modified?: number;
	public banned?: number;
}

export class BackendModelSimpleUserEntry {
	public uuid: string = "";
	public displayname: string = "";
	public avatarlocation: string = "";
	public isbanned: boolean = false;
}
