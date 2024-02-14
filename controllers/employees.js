const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */
const all = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany();

		return res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ message: 'Failed to get employees.' });
	}
};

/**
 * @route POST /api/employees/add
 * @desc Add employee
 * @access Private
 */
const add = async (req, res) => {
	try {
		const data = req.body;

		if (!data.firstName || !data.lastName || !data.address || !data.age) {
			return res.status(400).json({ message: 'All fields are required.' });
		}

		const employee = await prisma.employee.create({
			data: {
				...data,
				userId: req.user.id,
			},
		});

		return res.status(201).json(employee);
	} catch (error) {
		res.status(500).json({ message: 'Failed to add employee.' });
	}
};

/**
 * @route POST /api/employees/remove/:id
 * @desc Remove employee
 * @access Private
 */
const remove = async (req, res) => {
	const { id } = req.body;

	try {
		await prisma.employee.delete({
			where: {
				id,
			},
		});

		return res.status(204).json('OK');
	} catch (error) {
		res.status(500).json({ message: 'Failed to remove employee.' });
	}
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Edit employee
 * @access Private
 */
const edit = async (req, res) => {
	const data = req.body;
	const id = data.id;

	try {
		await prisma.employee.update({
			where: {
				id,
			},
			data,
		});

		return res.status(204).json('OK');
	} catch (error) {
		res.status(500).json({ message: 'Failed to edit employee.' });
	}
};

/**
 * @route GET /api/employees/:id
 * @desc Get employee
 * @access Private
 */
const employee = async (req, res) => {
	const { id } = req.params;

	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		});

		return res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({ message: 'Failed to get employee.' });
	}
};

module.exports = {
	all,
	add,
	remove,
	edit,
	employee,
};
