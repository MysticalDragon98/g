import { resolve } from "path";

const DATADIR = process.env.DATA_DIR ?? resolve(__dirname, "../../.data");

export default DATADIR;