import type { FormData } from "../interfaces/general";

export const formattedData = (formData: FormData) => `
<img src="https://github.com/user-attachments/assets/2cf4109d-0f1c-4df8-8815-6eadca2d7ed0" alt="Logo" style="vertical-align: middle; margin-left: 10px; width: 20px; height: auto;"><br>
# [${formData.category}]: ${formData.title} 

Hi @${formData.directedTo} and everyone!, I'm a Dojo Coding member⛩️ 

${formData.description}

## Steps to Resolve:
${formData.lists
  .map(
    (list, index) => `
<details>
  <summary><strong>${index + 1}) ${list.title}</strong></summary>
  <br>
  <ul>
    ${list.items.map((item) => `<li>${item.name}</li>`).join("")}
  </ul>
</details>
`
  )
  .join("")}

---

**Estimated Time:** ${formData.estimatedTime.start}-${
  formData.estimatedTime.end
} ${formData.estimatedTime.unit}

${formData.gratitude}
      `;
