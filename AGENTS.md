# Project instructions

## Frontend design

- Use the original DESIGN.md files as the base specification for frontend design.
- Read [DESIGN.md](docs/design/stitch/cognitive_architecture/DESIGN.md) first
  for shared design rules and the light theme. For dark theme colors and styles,
  read the [dark DESIGN.md](docs/design/stitch/cognitive_architecture/dark/DESIGN.md).
  Follow each theme's design document when its screen references conflict with it.
- Apply the interpretation rules and design decisions in
  [the design README](docs/design/stitch/README.md). Do not record applications of
  existing rules as separate decisions. A recorded decision overrides the original
  specification only within its stated scope.
- Use the screenshots to check layout and visual hierarchy. Use the exported
  HTML to understand styles and structure.
- Record application design decisions that future implementation must follow,
  including intentional overrides of the source. State each decision's scope,
  selected rule or value, and reason. Do not silently combine conflicting values.
- Do not repeat unambiguous source values or rules in the design README.
  Link to the source when needed.
- Treat the references as design guidance. Example content, menus, and buttons
  do not define feature requirements.
- For states without a reference, follow the design principles and accessibility
  needs. These states include responsive layouts, keyboard focus, loading,
  errors, and empty content.
- Keep frontend implementation and usage instructions in the
  [frontend README](frontend/README.md).
- Keep the original Stitch file contents unchanged.

## Documentation

- Write project documentation in English. Apply these rules to this AGENTS.md
  file as well.
- Use [ASD-STE100](https://www.asd-ste100.org/) as a writing guide. Strict
  compliance with its vocabulary and all rules is not required.
- Write short, clear sentences. Keep one main idea in each sentence.
- Prefer active voice. Use direct instructions for procedures.
- Use the same term for the same concept. Keep accurate technical terms.
- Write for readers who do not know the project history or prior conversations.
  Explain the current structure, usage, and reasons for decisions.
- Keep each topic in one primary document. Link to that document
  instead of repeating its content in other documents.
- Keep change history in Git. Do not require readers to know an earlier file
  layout to understand a document.
- Apply these writing rules to documents you create or edit. Do not rewrite
  imported source files only to make them follow these rules.
