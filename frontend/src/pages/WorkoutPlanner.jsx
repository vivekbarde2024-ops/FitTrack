import { useState } from "react";
import {
  Dumbbell,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  CalendarDays
} from "lucide-react";

const workoutPlans = {
  Chest: [
    { name: "Bench Press", sets: 4, reps: "10-12", rest: "90 sec" },
    { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec" },
    { name: "Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" },
    { name: "Push Ups", sets: 3, reps: "15", rest: "45 sec" }
  ],
  Back: [
    { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "90 sec" },
    { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60 sec" },
    { name: "One Arm Dumbbell Row", sets: 3, reps: "10", rest: "60 sec" },
    { name: "Deadlift", sets: 3, reps: "8", rest: "120 sec" }
  ],
  Shoulders: [
    { name: "Shoulder Press", sets: 4, reps: "10", rest: "90 sec" },
    { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60 sec" },
    { name: "Front Raises", sets: 3, reps: "12", rest: "60 sec" },
    { name: "Reverse Fly", sets: 3, reps: "12", rest: "60 sec" }
  ],
  Arms: [
    { name: "Barbell Curl", sets: 3, reps: "12", rest: "60 sec" },
    { name: "Hammer Curl", sets: 3, reps: "12", rest: "60 sec" },
    { name: "Tricep Pushdown", sets: 3, reps: "12", rest: "60 sec" },
    { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: "60 sec" }
  ],
  Legs: [
    { name: "Squats", sets: 4, reps: "10", rest: "120 sec" },
    { name: "Leg Press", sets: 3, reps: "12", rest: "90 sec" },
    { name: "Leg Extension", sets: 3, reps: "12", rest: "60 sec" },
    { name: "Leg Curls", sets: 3, reps: "12", rest: "60 sec" }
  ],
  Abs: [
    { name: "Crunches", sets: 3, reps: "15", rest: "45 sec" },
    { name: "Leg Raises", sets: 3, reps: "12", rest: "45 sec" },
    { name: "Plank", sets: 3, reps: "30 sec", rest: "45 sec" },
    { name: "Mountain Climbers", sets: 3, reps: "20", rest: "45 sec" }
  ]
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function WorkoutPlanner() {
  const [selectedMuscle, setSelectedMuscle] = useState("Chest");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [completed, setCompleted] = useState({});
  const [difficulty, setDifficulty] = useState("Intermediate");

  const exercises = workoutPlans[selectedMuscle];

  const completedCount = exercises.filter(
    (_, index) => completed[`${selectedMuscle}-${index}`]
  ).length;

  const toggleExercise = (index) => {
    const key = `${selectedMuscle}-${index}`;

    setCompleted(previous => ({
      ...previous,
      [key]: !previous[key]
    }));
  };

  return (
    <div className="workout-page">

      <div className="workout-heading">
        <div>
          <span className="workout-eyebrow">TRAIN SMARTER</span>
          <h1>Workout Planner</h1>
          <p>Plan your training and track your daily workout.</p>
        </div>

        <div className="workout-date">
          <CalendarDays size={18} />
          {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>

      <div className="workout-stats">
        <div className="workout-stat">
          <Dumbbell />
          <span>Exercises</span>
          <strong>{exercises.length}</strong>
        </div>

        <div className="workout-stat">
          <CheckCircle2 />
          <span>Completed</span>
          <strong>{completedCount}/{exercises.length}</strong>
        </div>

        <div className="workout-stat">
          <Flame />
          <span>Progress</span>
          <strong>{Math.round(completedCount / exercises.length * 100)}%</strong>
        </div>
      </div>

      <div className="workout-content">

        <section className="workout-panel">
          <h2>Select Muscle Group</h2>
          <p>Choose the muscle group you want to train.</p>

          <div className="muscle-grid">
            {Object.keys(workoutPlans).map(muscle => (
              <button
                key={muscle}
                className={selectedMuscle === muscle ? "muscle-active" : ""}
                onClick={() => setSelectedMuscle(muscle)}
              >
                <Dumbbell size={19} />
                {muscle}
              </button>
            ))}
          </div>

          <h2 className="workout-subheading">Workout Schedule</h2>

          <div className="day-list">
            {days.map(day => (
              <button
                key={day}
                className={selectedDay === day ? "day-active" : ""}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <h2 className="workout-subheading">Fitness Level</h2>

          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="workout-select"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </section>

        <section className="workout-panel exercise-panel">

          <div className="exercise-heading">
            <div>
              <h2>{selectedMuscle} Workout</h2>
              <p>{selectedDay} · {difficulty}</p>
            </div>
            <Dumbbell size={25} />
          </div>

          <div className="exercise-list">

            {exercises.map((exercise, index) => {
              const isDone = completed[`${selectedMuscle}-${index}`];

              return (
                <div
                  className={`exercise-item ${isDone ? "exercise-done" : ""}`}
                  key={exercise.name}
                >
                  <button
                    className="exercise-check"
                    onClick={() => toggleExercise(index)}
                  >
                    {isDone
                      ? <CheckCircle2 />
                      : <Circle />}
                  </button>

                  <div className="exercise-details">
                    <strong>{exercise.name}</strong>
                    <span>
                      {exercise.sets} Sets · {exercise.reps} Reps
                    </span>
                  </div>

                  <div className="exercise-rest">
                    <Clock size={14} />
                    {exercise.rest}
                  </div>
                </div>
              );
            })}

          </div>

          <div className="workout-progress">
            <div>
              <span>Workout Completion</span>
              <strong>
                {completedCount}/{exercises.length}
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${completedCount / exercises.length * 100}%`
                }}
              />
            </div>
          </div>

          <button
            className="reset-workout"
            onClick={() => {
              setCompleted(previous => {
                const updated = { ...previous };
                exercises.forEach((_, index) => {
                  delete updated[`${selectedMuscle}-${index}`];
                });
                return updated;
              });
            }}
          >
            Reset Workout
          </button>

        </section>
      </div>
    </div>
  );
}

export default WorkoutPlanner;