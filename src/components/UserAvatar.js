import "../styles/UserAvatar.css"

const UserAvatar = ({ name, size = "md", className = "" }) => {
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U"

    const names = name.split(" ")
    if (names.length === 1) return names[0].charAt(0).toUpperCase()

    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  // Get background color based on name (for consistent color per user)
  const getBackgroundColor = (name) => {
    if (!name) return "#1a73e8" // Default blue

    const colors = [
      "#1a73e8", // Blue
      "#ea4335", // Red
      "#34a853", // Green
      "#fbbc05", // Yellow
      "#8e24aa", // Purple
      "#16a085", // Teal
      "#d81b60", // Pink
      "#f4511e", // Deep Orange
    ]

    // Simple hash function to get consistent color for the same name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const sizeClass = {
    sm: "avatar-sm",
    md: "avatar-md",
    lg: "avatar-lg",
    xl: "avatar-xl",
  }

  const initials = getInitials(name)
  const bgColor = getBackgroundColor(name)

  return (
    <div className={`user-avatar ${sizeClass[size] || "avatar-md"} ${className}`} style={{ backgroundColor: bgColor }}>
      {initials}
    </div>
  )
}

export default UserAvatar
