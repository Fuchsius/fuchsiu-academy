"use client";

import React, {
  useState,
  useMemo,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import {
  MdSearch,
  MdFilterList,
  MdBlock,
  MdCheckCircle,
  MdEdit,
  MdMoreVert,
  MdPersonAdd,
  MdClear,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast"; // Import react-hot-toast
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define UserRole enum locally, mirroring Prisma
enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

// Define user type
interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string; // ISO date string
  studentProfile?: { id: string } | null; // Simplified student profile
}

const ITEMS_PER_PAGE = 10;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const { toast } = useToast(); // Remove old toast hook

  // Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      if (filterRole !== "all") params.append("role", filterRole);
      if (filterStatus !== "all") params.append("status", filterStatus);

      const response = await fetch(`/api/admin/users?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      // setCurrentPage(data.currentPage || 1); // This might cause a loop if currentPage is also a dependency
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again."); // Use react-hot-toast
      setUsers([]); // Clear users on error
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, filterRole, filterStatus, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // fetchUsers is memoized with useCallback

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filterRole, filterStatus]);

  const filteredAndSortedUsers = useMemo(() => {
    // Client-side filtering/sorting is no longer needed as server handles it.
    // However, if you want to keep some client-side responsiveness while backend fetches,
    // you could apply some basic filtering here on the `users` state.
    // For now, we directly use the `users` state fetched from the server.
    return users;
  }, [users]);

  const paginatedUsers = useMemo(() => {
    // Pagination is now handled by the API, so this just returns the fetched users for the current page.
    return filteredAndSortedUsers;
  }, [filteredAndSortedUsers]);

  // totalPages is now set from API response

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // setCurrentPage(1); // Page reset is handled by useEffect on debouncedSearchTerm
  };
  const handleClearSearch = () => setSearchTerm("");

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openConfirmationDialog = (
    user: User,
    actionType: "block" | "unblock" | "changeRole",
    newRole?: UserRole
  ) => {
    setSelectedUser(user);
    let title = "";
    let description = "";
    let actionFunction: () => void;

    if (actionType === "block") {
      title = `Block User: ${user.name || user.email}?`;
      description =
        "Blocking this user will prevent them from accessing the platform. Are you sure?";
      actionFunction = () => handleBlockToggle(user, true);
    } else if (actionType === "unblock") {
      title = `Unblock User: ${user.name || user.email}?`;
      description =
        "Unblocking this user will restore their access to the platform. Are you sure?";
      actionFunction = () => handleBlockToggle(user, false);
    } else if (actionType === "changeRole" && newRole) {
      title = `Change Role for ${user.name || user.email}?`;
      description = `Are you sure you want to change this user's role to ${newRole}?`;
      actionFunction = () => handleChangeRole(user, newRole);
    } else {
      return; // Should not happen
    }

    setDialogContent({ title, description });
    setDialogAction(() => actionFunction); // Store the function itself
    setIsConfirmDialogOpen(true);
  };

  const handleBlockToggle = async (userToUpdate: User, block: boolean) => {
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
    try {
      const response = await fetch(
        `/api/admin/users?userId=${userToUpdate.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isBlocked: block }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to ${block ? "block" : "unblock"} user.`
        );
      }
      toast.success(
        // Use react-hot-toast
        `User ${userToUpdate.name || userToUpdate.email} has been ${
          block ? "blocked" : "unblocked"
        }.`
      );
      fetchUsers(); // Refresh users list
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast.error(error.message || "Could not update user status."); // Use react-hot-toast
    }
  };

  const handleChangeRole = async (userToUpdate: User, newRole: UserRole) => {
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
    try {
      const response = await fetch(
        `/api/admin/users?userId=${userToUpdate.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change user role.");
      }
      toast.success(
        // Use react-hot-toast
        `User ${
          userToUpdate.name || userToUpdate.email
        }'s role changed to ${newRole}.`
      );
      fetchUsers(); // Refresh users list
    } catch (error: any) {
      console.error("Error changing user role:", error);
      toast.error(error.message || "Could not change user role."); // Use react-hot-toast
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          User Management
        </h1>
        {/* <Button className="flex items-center gap-2">
          <MdPersonAdd className="h-5 w-5" /> Add New User 
        </Button> 
        // Add User functionality can be added later if needed, for now focusing on managing existing users.
        */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View, manage, and update user accounts and roles. (
            {isLoading
              ? "Loading..."
              : `${filteredAndSortedUsers.length} of ${
                  totalPages * ITEMS_PER_PAGE
                } users`}
            )
          </CardDescription>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2 flex-wrap">
            <div className="relative flex-grow min-w-[200px] md:min-w-[300px]">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users (name, email)..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleClearSearch}
                >
                  <MdClear className="h-5 w-5" />
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 min-w-[150px] justify-between"
                >
                  <span>Role: {filterRole === "all" ? "All" : filterRole}</span>{" "}
                  <MdFilterList className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterRole("all")}>
                  All Roles
                </DropdownMenuItem>
                {Object.values(UserRole).map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => setFilterRole(role)}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 min-w-[150px] justify-between"
                >
                  <span>
                    Status:{" "}
                    {filterStatus === "all"
                      ? "All"
                      : filterStatus.charAt(0).toUpperCase() +
                        filterStatus.slice(1)}
                  </span>{" "}
                  <MdFilterList className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("blocked")}>
                  Blocked
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Spinner size="lg" /> {/* Corrected size to lg */}
            </div>
          )}
          {!isLoading && paginatedUsers.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No users found matching your criteria.
            </div>
          )}
          {!isLoading && paginatedUsers.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === UserRole.ADMIN
                            ? "default"
                            : user.role === UserRole.INSTRUCTOR
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={user.isBlocked ? "destructive" : "default"}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isLoading}
                          >
                            {" "}
                            {/* Disable actions while loading */}
                            <MdMoreVert className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {user.isBlocked ? (
                            <DropdownMenuItem
                              onClick={() =>
                                openConfirmationDialog(user, "unblock")
                              }
                              className="flex items-center gap-2"
                              disabled={isLoading}
                            >
                              <MdCheckCircle className="h-4 w-4 text-green-500" />{" "}
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                openConfirmationDialog(user, "block")
                              }
                              className="flex items-center gap-2"
                              disabled={isLoading}
                            >
                              <MdBlock className="h-4 w-4 text-red-500" /> Block
                              User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                              className="flex items-center gap-2"
                              disabled={isLoading}
                            >
                              <MdEdit className="h-4 w-4" /> Change Role
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuLabel>
                                  Set Role To
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {Object.values(UserRole).map((role) => (
                                  <DropdownMenuItem
                                    key={role}
                                    disabled={user.role === role || isLoading}
                                    onClick={() =>
                                      openConfirmationDialog(
                                        user,
                                        "changeRole",
                                        role
                                      )
                                    }
                                  >
                                    {role} {user.role === role && "(Current)"}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={
                dialogContent.title.toLowerCase().includes("block")
                  ? "destructive"
                  : "default"
              }
              onClick={() => {
                if (dialogAction) {
                  dialogAction();
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
