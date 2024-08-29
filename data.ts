import { PRIORITY_OPTIONS, PRIORITY_TYPE } from "./helpers/constants";

type DATATYPE = {
  priority: PRIORITY_TYPE;
  title: string;
  description?: string;
  due_date: string;
};

export const tasks: Record<string, DATATYPE[]> = {
  to_do: [
    {
      title: "Publish my first book",
      description: `Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words.`,
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[0],
    },
    {
      title: "Home Renovation",
      description: "Write a blog post outlining the top 10 products",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[1],
    },

    {
      title: "Organize a charity event",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[0],
    },
  ],

  in_progress: [
    {
      title: "Watch a Frontend Tutorial",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[2],
    },
    {
      title: "Prep my week meal",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[1],
    },
  ],

  completed: [
    {
      title: "Read a book",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[1],
    },
    {
      title: "Improve cards readability",
      description: "As a team license owner, I want to use multiplied limits",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[2],
    },

    {
      title: "Attend standup and give updates",
      due_date: "Wed Aug 28 2024 23:43:34 GMT+0100 (West Africa Standard Time)",
      priority: PRIORITY_OPTIONS[0],
    },
  ],
};
