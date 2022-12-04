const timeDiffToMinute = (d1: Date, d2: Date) => {
	return Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60);
};

export { timeDiffToMinute };
