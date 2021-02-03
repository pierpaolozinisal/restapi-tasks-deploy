import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

/// GET
// ricerca tutto
export const findAllTasks = async (req, res) => {
  try {
    const { size, page, title } = req.query
    const { limit, offset} = getPagination(page, size)
    console.log(limit, offset);
    const condition = title ? {
      title: {$regex: new RegExp(title), $options : 'i'}
    } : {};
    const data = await Task.paginate(condition, { offset , limit });
    console.log(data);
    //console.log(data.page, data.totalPages)
    //console.log(data.nextPage, data.prevPage)
    //res.json(data);
    res.json({
      totalItmes: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving tasks",
    });
  }
};
/// GET
// ricerca tutto vecchio
export const findAllTasksOld = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving tasks",
    });
  }
};
//ricerca tutto con done = true
export const findAllDoneTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving tasks",
    });
  }
};
//ricerca per Id
export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with id ${id} not exists!` });
    }
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({message: error.message || "Something goes wrong retrieving tasks"});
  }
};

//ricerca per titolo
export const findOneTaskTitle = async (req, res) => {
  const { title } = req.params;
  console.log(title);
  try {
    const task = await Task.find({title : title});
    console.log(task.length)
    if (task.length === 0) {
  
      return res.status(404).json({ message: `task with title ${title} not exists!` });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving tasks",
    });
  }
};

//prova ricerca con regex
//ricerca per titolo
export const findOneTaskTitleLike = async (req, res) => {
   const { title } = req.params;
   try {
    //const task = await Task.find({title :{ $text:  title}});
    const task = await Task.find( {title : {$regex : title} });
    if (task.length === 0) {
       return res.status(404).json({ message: `task with title like ${title} not exists!` });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving tasks",
    });
  }
};

///POST Crea nuovo Task
export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title cannot be empty!!" });
  }
  const testTitle = await Task.find({ title: req.body.title });
  console.log(testTitle);
  if (testTitle.length === 1) {
    return res.status(400).send({ message: "Title already exist!" });
  }
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating task",
    });
  }
};

/// DELETE cancella task per Id
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Task.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: `Task with ${id} not exists!` });
    }
    res.json(`${data.title} Task successfully deleted`);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong deleting task",
    });
  }
};

/// UPDATE
export const updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json("Task updated successfully");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong updating task",
    });
  }
};
