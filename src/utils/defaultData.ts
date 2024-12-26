import type { FormData } from "../interfaces/general";

export const defaultFormData: FormData = {
    title: "Create Dashboard Page",
    directedTo: "JhonDoe",
    description:
      "I’d be happy to take on creating the Dashboard page. With over 5 years of experience in frontend development, I’ve worked on similar projects and can ensure a clean, user-friendly, and well-structured implementation.",
    category: "FE", // Default category: Frontend
    estimatedTime: {
      start: 1, // Default start time (1 day)
      end: 1, // Default end time (1 day)
      unit: "days", // Time unit (days)
    },
    gratitude: "Let me know if I can start working on this!",
    lists: [
      {
        title: "Understand the Requirements",
        items: [
          {
            id: 1,
            name: "Review the Figma design to fully understand the layout and components required for the Dashboard page.",
          },
          {
            id: 2,
            name: "Understand the key sections that need to be implemented.",
          },
        ],
      },
      {
        title: "Edit the Component",
        items: [
          {
            id: 3,
            name: "Navigate to src/components/dashboard/DashboardComponent.tsx.",
          },
          { id: 4, name: "Ensure the Dashboard component is properly set up." },
          {
            id: 5,
            name: "Implement the design elements and structure of the Dashboard as outlined in the Figma file.",
          },
          {
            id: 6,
            name: "Ensure all sections and components are added according to the layout.",
          },
        ],
      },
      {
        title: "Create the Chart",
        items: [
          {
            id: 7,
            name: "Select the chart library (chart.js, recharts, or apexcharts) to use.",
          },
          {
            id: 8,
            name: "Implement the 'Sale by Month' chart using the selected library.",
          },
          {
            id: 9,
            name: "Style the chart to align with the application's design and branding.",
          },
        ],
      },
      {
        title: "Maintain Responsiveness",
        items: [
          {
            id: 10,
            name: "Use Tailwind CSS or other utilities to make the page responsive.",
          },
          {
            id: 11,
            name: "Ensure the layout is optimized for mobile, tablet, and desktop.",
          },
        ],
      },
      {
        title: "Testing",
        items: [
          {
            id: 12,
            name: "Test the Dashboard page for layout accuracy, responsiveness, and functionality.",
          },
          {
            id: 13,
            name: "Verify that the 'Sale by Month' chart displays data correctly and interacts as intended.",
          },
        ],
      },
      {
        title: "Finalize and Submit",
        items: [
          {
            id: 14,
            name: "Commit the changes to a branch named feature/dashboard-page.",
          },
          {
            id: 15,
            name: "Open a pull request with a detailed summary of the implementation.",
          },
        ],
      },
    ],
  };