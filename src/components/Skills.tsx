const skills = [
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/000000" },
  { name: "Java", icon: "fab fa-java" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/000000" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/000000" },
  { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/000000" },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/000000" },
  { name: "CSS", icon: "fab fa-css3" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/000000" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/000000" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/000000" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/000000" },
  { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/000000" },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/000000" },
  { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/000000" },
];

export const Skills = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium mb-12 text-center uppercase tracking-wider">
            My Skills
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative border border-border rounded-lg p-6 bg-card flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill.icon.startsWith("fab ") ? (
                  <i className={`${skill.icon} text-2xl transition-transform group-hover:scale-110`}></i>
                ) : (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 transition-transform group-hover:scale-110 dark:invert"
                  />
                )}
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
